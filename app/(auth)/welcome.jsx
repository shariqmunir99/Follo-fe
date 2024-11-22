import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Redirect, router } from "expo-router";
import { icons, images } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const Onboarding = () => {
  const onClick = () => {
    router.push("/dashboard");
  };
  return (
    <LinearGradient
      colors={["#100425", "#3a026e", "#100425"]} // Adding the fourth color (yellow)
      locations={[0.25, 0.5, 1]} // Adjust the color stops for smooth transition
      start={{ x: 0, y: 0 }} // Vertical gradient direction (top to bottom)
      end={{ x: 0, y: 1 }} // Ensures the gradient is applied vertically
      style={{ flex: 1 }} // Ensure the gradient takes up the full screen
    >
      <SafeAreaView className="w-full h-full">
        <Image source={images.bg} className="w-full absolute top-0" />
        <View className="flex-row mt-[20%] mx-auto">
          <Text className="text-Text text-4xl">Welcome to </Text>
          <Text className="text-Vivid text-4xl font-PoppinsBold mt-[3px]">
            Follo
          </Text>
        </View>
        <View>
          <Image
            source={images.w1}
            className={"w-[82%] ml-[11%]"}
            resizeMode="contain"
          />
          <Image
            source={images.w2}
            className={"w-[95%] ml-[7%] -mt-[40%]"}
            resizeMode="contain"
          />
        </View>
        <View className="flex-row mx-auto">
          <Text className="text-Text text-sm font-PoppinsRegular">
            A one stop solution for all your{" "}
          </Text>
          <Text className="text-Vivid text-sm font-PoppinsBold">Eventing </Text>
          <Text className="text-Text text-sm font-PoppinsRegular">needs</Text>
        </View>
        <CustomButton
          title="Get Started"
          containerStyles="w-[85%] min-h-[50px] mx-auto rounded-lg mt-5"
          handlePress={onClick}
          isIcon={true}
          icon={icons.welcome}
          iconOnly={false}
          iconStyles={"mb-0.5 ml-2 "}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Onboarding;
