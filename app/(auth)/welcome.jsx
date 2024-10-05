import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Redirect, router } from "expo-router";
import arrow from '../../assets/icons/to.png'

const Onboarding = () => {
  const onClick = () => {
    router.push('/sign-in')
  }
  return (
    <SafeAreaView className="min-h-screen relative justify-center bg-Main">
      <CustomButton 
        title= "Get Started"
        containerStyles="w-[65%] mx-auto rounded-full"
        handlePress={onClick}
      />
      {/* <Text className="text-center text-Text text-4xl ">Upr Dekh</Text> */}
      <Text className="absolute top-10 text-Vivid text-xs ">
        Uss kone mein dekh
      </Text>
      <Text className="absolute top-10 right-0 text-MainLight text-[17px] ">
        hn ab bottom dekh
      </Text>
      <Text className="absolute bottom-0 text-center right-0  text-Vivid text-[12px] ">
        Abey idhr ni dusre kone mein jahil
      </Text>
      <Text className="absolute bottom-0 text-Text left-0  text-[5px] ">
        Chal ab kaam krle na bhai kiu time waste kr rha :D
      </Text>
    </SafeAreaView>
  );
};

export default Onboarding;