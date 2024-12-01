import { View, Text, ActivityIndicator, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const Verify = () => {
  const { onVerify, authState } = useAuth();
  const [verifyToken, setVerifyToken] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Extract the token from the current URL path
    if (params?.id) {
      setVerifyToken(params.id);
    }
  }, [params]);

  const clickVerify = async () => {
    setLoading(true);

    const result = await onVerify(verifyToken);
    if (result && !result.error) {
      setIsPressed(true);
      if (authState?.authenticated) {
        if (result.data.result.roleName === "Organizer")
          router.replace("(organizer)/dashboard");
        else router.replace("(user)/home");
      }
      router.replace("/(auth)/sign-in");
    }
  };

  return (
    <SafeAreaView className="bg-Main h-full">
      {loading && (
        <Modal transparent={true} animationType="fade">
          <View className="flex-1 bg-black/50 justify-center items-center">
            <ActivityIndicator size="large" color="yellow" />
          </View>
        </Modal>
      )}
      <View>
        <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">
          Follo
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: isPressed ? "45%" : "38%",
          width: "100%",
        }}
        className="justify-center items-center"
      >
        {!isPressed ? (
          <View>
            <Text className="text-Text font-PoppinsBold text-2xl">
              Click the button to verify
            </Text>
            <CustomButton
              title="Verify"
              handlePress={clickVerify}
              containerStyles={"mt-7 w-[150px] h-[65px] mx-auto rounded-3xl"}
              isIcon={false}
              iconOnly={false}
            />
          </View>
        ) : (
          <View className="flex-col gap-1.5 items-center">
            <Text className="text-Text text-2xl font-PoppinsBold">
              You have been verified
            </Text>
            <View className="flex-row">
              <Text className="text-Text text-sm font-PoppinsRegular">
                Open{" "}
              </Text>
              <Text className="text-Vivid text-sm font-PoppinsBold">
                Follo{" "}
              </Text>
              <Text className="text-Text text-sm font-PoppinsRegular">
                app and enjoy all the features
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Verify;
