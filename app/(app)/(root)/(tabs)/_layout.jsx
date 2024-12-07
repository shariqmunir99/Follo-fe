import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import "react-native-reanimated";
import { UserService } from "../../../../services/user.service";

export default function Layout() {
  const [isPressed, setIsPressed] = useState(false);
  const { onLogout } = useAuth();
  const verifyMutation = useMutation({
    mutationFn: UserService.verify,
  });
  const { authState } = useAuth();

  const handleVerify = () => {
    setIsPressed(true);
    verifyMutation.mutate();
  };
  return (
    <>
      <Stack>
        <Stack.Screen name="(organizer)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
      </Stack>

      {!authState.verified && (
        <>
          <SafeAreaView className="bg-Main w-full  border-t-[0.5px] border-Vivid">
            <View className="bg-Main flex-row p-4 mx-auto pb-2 justify-between">
              {!isPressed ? (
                <>
                  <Text className="text-Vivid font-PoppinsRegular">
                    Do you want to use all features?
                  </Text>
                  <CustomButton
                    title="Verify"
                    handlePress={handleVerify}
                    containerStyles={
                      "ml-4 bg-Main border-[0.5px] border-Vivid rounded-md px-2"
                    }
                    textStyles={"text-Vivid text-sm"}
                    isLoading={verifyMutation.isPending}
                  />
                </>
              ) : (
                <>
                  <View className="flex-col">
                    <Text className="text-Vivid font-PoppinsRegular  max-w-xs">
                      An email has been sent to your account.
                    </Text>
                    <Text className="text-Vivid font-PoppinsRegular  max-w-xs">
                      Verify your account and login again.
                    </Text>
                  </View>
                  <CustomButton
                    title="Login"
                    handlePress={() => {
                      onLogout();
                      router.replace("/sign-in");
                    }}
                    containerStyles={
                      "ml-4 bg-Main border-[0.5px] border-Vivid rounded-md px-2"
                    }
                    textStyles={"text-Vivid text-sm"}
                  />
                </>
              )}
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
}
