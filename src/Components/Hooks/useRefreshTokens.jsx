import { useState, useEffect, useRef } from "react";
import axios from "axios";

function useRefreshTokens() {
  const [shouldRefreshToken, setShouldRefreshToken] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const didRun = useRef(false); // To prevent multiple executions

  useEffect(() => {
    if (typeof window === 'undefined' || didRun.current) return;

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

    const onLoad = () => {
      refreshTokensIfNeeded();
      const interval = setInterval(refreshTokensIfNeeded, 5000); // Check every 5 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }

    didRun.current = true;
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
  }, [shouldRefreshToken, isRefreshing]);
}

export default useRefreshTokens;
