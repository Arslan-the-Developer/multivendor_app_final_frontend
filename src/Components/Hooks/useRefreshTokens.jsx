import { useEffect, useRef } from "react";
import api from "../../axios";

/**
 * Custom hook that polls every 10 seconds and refreshes tokens only if
 * at least 5 minutes have elapsed since the last client-side refresh.
 */
function useRefreshTokens() {
  const isRefreshing = useRef(false);
  const FIVE_MINUTES_MS = 5 * 60 * 1000;

  const checkAndRefresh = async () => {

    console.log("Checking For Refresh...");

    if (isRefreshing.current) return;

    // Read last client-side refresh timestamp
    const lastIso = localStorage.getItem("lastRefreshIso");
    const lastTime = lastIso ? new Date(lastIso) : null;
    const now = new Date();

    // If we've done a refresh within the last 5 minutes, skip
    if (lastTime && now - lastTime < FIVE_MINUTES_MS) return;

    isRefreshing.current = true;

    try {

      const response = await api.get("/authentication/refresh_user_tokens");

      if (response.data) {
        console.log("Tokens refreshed at", now.toLocaleTimeString());
        // Mark this moment as the last refresh using client clock
        localStorage.setItem("lastRefreshIso", now.toISOString());

        console.log("Refreshed Tokens");
      }
    } catch (error) {
      console.error(
        "Error refreshing tokens:",
        error.response?.data || error.message
      );
    } finally {
      isRefreshing.current = false;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize marker if not present
    if (!localStorage.getItem("lastRefreshIso")) {
      localStorage.setItem("lastRefreshIso", new Date().toISOString());
    }

    // Run once immediately, then every 10 seconds
    checkAndRefresh();

    const intervalId = setInterval(checkAndRefresh, 10000);

    return () => clearInterval(intervalId);
  }, []);
}

export default useRefreshTokens;
