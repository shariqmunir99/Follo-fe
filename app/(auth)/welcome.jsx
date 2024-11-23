import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Redirect, router } from "expo-router";
import { icons, images } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const Onboarding = () => {
  const onClick = () => {
    router.push("/sign-in");
  };
  const screenHeight = Dimensions.get("window").height;
  return (
    <LinearGradient
      colors={["#100425", "#3a026e", "#100425"]} // Adding the fourth color (yellow)
      locations={[0.2, 0.55, 1]} // Adjust the color stops for smooth transition
      start={{ x: 0, y: 0 }} // Vertical gradient direction (top to bottom)
      end={{ x: 0, y: 1 }} // Ensures the gradient is applied vertically
      className="flex-1" // Ensure the gradient takes up the full screen
    >
      <SafeAreaView className="w-full h-full">
        <Image source={images.bg} className="w-full absolute top-0" />
        <View
          className="flex-row absolute w-full h-full justify-center"
          style={{ top: screenHeight * 0.15 }}
        >
          <Text className="text-Text text-4xl">Welcome to </Text>
          <Text className="text-Vivid text-4xl font-PoppinsBold mt-[3px]">
            Follo
          </Text>
        </View>
        <View
          className="absolute w-full h-full"
          style={{ top: screenHeight * 0.22 }}
        >
          <Image
            source={images.w1}
            className={"w-[82%] ml-[11%] absolute "}
            style={{ top: screenHeight * 0 }}
            resizeMode="contain"
          />
          <Image
            source={images.w2}
            className={"w-[95%] ml-[7%] absolute "}
            style={{ top: screenHeight * 0.17 }}
            resizeMode="contain"
          />
          {/* -mt-[40%] */}
        </View>
        <View
          className="flex-row absolute w-full h-full justify-center"
          style={{ top: screenHeight * 0.82 }}
        >
          <Text className="text-Text text-sm font-PoppinsRegular">
            A one stop solution for all your{" "}
          </Text>
          <Text className="text-Vivid text-sm font-PoppinsBold">Eventing </Text>
          <Text className="text-Text text-sm font-PoppinsRegular">needs</Text>
        </View>
        <View
          className=" w-full h-full absolute justify-center"
          style={{ top: screenHeight * 0.38 }}
        >
          <CustomButton
            title="Get Started"
            containerStyles="w-[330px] min-h-[50px] mx-auto rounded-lg mt-5"
            handlePress={onClick}
            isIcon={true}
            icon={icons.welcome}
            iconOnly={false}
            iconStyles={"mb-0.5 ml-2 "}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Onboarding;
