import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

const SignUp = () => {
  const onClick = () => {
    router.push('/sign-in')
  }
  return (
    <SafeAreaView className="bg-Main h-full">
      <ScrollView>
        <View className="w-full justify-center h-[90%]">
          <Text className="font-PoppinsBold text-Vivid text-6xl font-extrabold text-center pt-[80px]">Follo</Text>
          <View className ="px-8">
            <Text className="text-Text font-bold text-3xl
              mt-6">Sign up</Text>
            <InputField 
              title="Username"
              value=""
              containerStyles={"mt-6"}
            />
            <InputField 
              title="Email"
              value=""
              containerStyles={"mt-3"}
            />
            <InputField 
              title="Password"
              value=""
              containerStyles={"mt-3"}
            />
            <InputField 
              title="Confirm Password"
              value=""
              containerStyles={"mt-3"}
            />
            <CustomButton 
              title="Sign up"
              handlePress={onClick}
              containerStyles={"mt-4 w-[40%] mx-auto rounded-3xl"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default SignUp;