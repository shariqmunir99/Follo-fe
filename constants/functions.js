// import { useState } from "react";

// export const useRefresh = (delay = 2000) => {
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, delay);
//   };

//   return [refreshing, onRefresh];
// };
import { useState, useEffect, useCallback } from "react";

export const useRefresh = (delay = 2000, fetchFunction, params = [], trigger = true) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    console.log("Fetching data...");
    try {
      setRefreshing(true);
      const result = await fetchFunction(...params); // Spread params dynamically
      console.log("Fetched data:", result);
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