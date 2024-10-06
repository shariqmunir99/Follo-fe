import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

const ResetPassword = () => {
    const clickReset = () =>{
        router.push("/sign-in")
    }

    return (
        <SafeAreaView className="bg-Main h-full">
          <ScrollView>
            <View className="w-full justify-center">
                <View className = "">
                  <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">Follo</Text>
                </View>
                <View className ="px-8">
                  <Text className="text-Text font-PoppinsSemiBold text-3xl">Reset Password</Text>
                    <InputField 
                    title="New Password"
                    value=""
                    containerStyles={"mt-7"}
                    />
                    <InputField 
                    title="Confirm Password"
                    value=""
                    containerStyles={"mt-7"}
                    />
                    <CustomButton 
                    title="Reset"
                    handlePress={clickReset}
                    containerStyles={"mt-7 w-[40%] mx-auto rounded-3xl"}
                    />
                </View>
            </View>
          </ScrollView>
        </SafeAreaView>
    
      );
}

export default ResetPassword
