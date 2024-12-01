import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const App = () => {
  const { authState, onLogout } = useAuth();
  console.log("AuthState: ", authState);
  if (authState?.authenticated) {
    if (authState.role === "Organizer") {
      return <Redirect href="/(root)/(tabs)/(organizer)/dashboard" />;
    }
    return <Redirect href="/(root)/(tabs)/(user)/home" />;
  }
  return <Redirect href="/(auth)/welcome" />;
};

export default App;
