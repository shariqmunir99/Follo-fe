import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Redirect, router } from "expo-router";
import { icons } from "../../constants";

const Onboarding = () => {
  const onClick = () => {
    router.push("/sign-in");
  };
  return (
    <SafeAreaView className="min-h-screen relative justify-center bg-Main">
      <CustomButton
        title="Get Started"
        containerStyles="w-[65%] min-h-[65px] mx-auto rounded-full"
        handlePress={onClick}
        isIcon={true}
        icon={icons.welcome}
        iconOnly={false}
        iconStyles={"mb-0.5 ml-2 "}
      />
    </SafeAreaView>
  );
};

export default Onboarding;
