import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="forget-password" options={{ headerShown: false }} />
      <Stack.Screen
        name="reset-password/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="verify/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
