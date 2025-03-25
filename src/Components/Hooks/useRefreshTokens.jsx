import axios from "axios";
import { useState, useEffect } from "react";

function useRefreshTokens() {
    const [shouldRefreshToken, setShouldRefreshToken] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const refreshTokensIfNeeded = () => {
            console.log("Checking for token refresh...");
            const tokenStoreDate = localStorage.getItem("store_date");
            const tokenStoreTime = localStorage.getItem("store_time");

            if (tokenStoreDate && tokenStoreTime) {
                const [hours, minutes, seconds] = tokenStoreTime.split(":").map(Number);
                const [year, month, day] = tokenStoreDate.split("-").map(Number);

                const storedDateTime = new Date(year, month - 1, day, hours, minutes, seconds);
                const currentDateTime = new Date();

                const minutesSinceTokenStored = Math.floor((currentDateTime - storedDateTime) / 60000);

                if (minutesSinceTokenStored > 9) {
                    setShouldRefreshToken(true); // Trigger token refresh
                }
            }
        };

        const interval = setInterval(refreshTokensIfNeeded, 5000); // Check every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const refreshTokens = async () => {
            if (!shouldRefreshToken || isRefreshing) return;

            setIsRefreshing(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/authentication/refresh_user_tokens`, {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });

                if (response.data) {
                    console.log("Tokens refreshed successfully:", response.data);
                    localStorage.setItem("store_date", response.data["store_date"]);
                    localStorage.setItem("store_time", response.data["store_time"]);
                }
            } catch (error) {
                console.error("Error refreshing tokens:", error.response?.data || error.message);
            } finally {
                setShouldRefreshToken(false);
                setIsRefreshing(false);
            }
        };

        if (shouldRefreshToken) {
            refreshTokens();
        }
    }, [shouldRefreshToken]);
}

export default useRefreshTokens;
