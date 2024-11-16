import { Stack } from "expo-router";
import { useState } from "react";
import "react-native-reanimated";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(organizer)" options={{ headerShown: false }} />
      <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
    </Stack>
  );
}
