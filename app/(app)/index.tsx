import React, { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const App = () => {
  const { authState, authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (authState?.authenticated) {
        if (authState.role === "Organizer") {
          router.replace("/(root)/(tabs)/(organizer)/dashboard");
        } else if (authState.role === "User") {
          router.replace("/(root)/(tabs)/(user)/home");
        }
      } else {
        router.replace("/(auth)/welcome");
      }
    }
  }, [authState, authLoading]);

  return null; // Avoid rendering anything during redirection
};

export default App;
