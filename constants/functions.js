import { useState, useEffect, useCallback } from "react";
import { locations } from "./data";

export const useRefresh = (delay = 0, fetchFunction, params = [], trigger = true) => {
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    console.log("Fetching data...");
    try {
      setRefreshing(true);
      const result = await fetchFunction(...params); // Spread params dynamically
      //console.log("Fetched data:", result);
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "An error occurred");
    } finally {
      console.log("Setting refreshing to false...");
      setTimeout(() => {
        setRefreshing(false);
      }, delay);
    }
  }, [fetchFunction, ...params]);

  useEffect(() => {
    if (trigger) {
      console.log("Triggering loadData...");
      loadData(); // Fetch data on initial load
    }
  }, [trigger]);

  return { data, error, refreshing, onRefresh: loadData };
};

export const isValidLocation = (location) => {
  return locations.includes(location);
};