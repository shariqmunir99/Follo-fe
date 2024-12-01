import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

export default function Layout() {
  const [isVerified, setIsVerified] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleVerify = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 5000);
  };
  return (
    <>
      {isVerified === false && (
        <View className="bg-Main w-full  border-b-[0.5px] border-Vivid">
          <View className="bg-Main flex-row pt-7 mx-auto pb-2">
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
            />
          </View>
        </View>
      )}
      {isPressed && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-80 justify-center items-center z-10">
          <View className=" p-5 rounded-lg">
            <Text className="text-center text-lg font-PoppinsBold text-Vivid">
              An email has been sent.
            </Text>
          </View>
        </View>
      )}
      <Stack>
        <Stack.Screen name="(organizer)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
