import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";



const SignIn = () => {
  const clickForget = () =>(
    router.push("/find-account")
  )
  return (
    <SafeAreaView className="bg-Main h-full">
      <ScrollView>
        <View className="w-full justify-center h-[80%]">
          <View className = "h-[20%]">
            <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">Follo</Text>
          </View>
          <View className ="px-8 h-[80%] pt-8">
            <Text className="text-Text font-PoppinsSemiBold text-3xl">Log in</Text>
              <InputField 
                title="Username or Email"
                value=""
                containerStyles={"mt-7"}
              />
              <InputField 
                title="Password"
                value=""
                containerStyles={"mt-7"}
              />
              <CustomButton 
                title="Log in"
                containerStyles={"mt-7 w-[40%] mx-auto rounded-3xl"}
              />
              <Link  href="/find-account" className="text-Text text-base mx-auto mt-8">Forget Password</Link>
              <View className="mt-5 mx-auto flex-row">
                <Text className="text-lg text-Text">Don't have an account?{" "}</Text>
                <Link
                  href="/sign-up"
                  className = "text-lg text-Vivid"
                >
                  Sign Up
                </Link>
              </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default SignIn;
