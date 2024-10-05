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
            <View className="w-full justify-center h-[80%]">
              <Text className="font-PoppinsBold text-Vivid text-6xl font-extrabold text-center pt-[130px]">Follo</Text>
              <View className ="px-8">
                <Text className="text-Text font-PoppinsExtraLight text-3xl
                  mt-10">Reset password</Text>
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
