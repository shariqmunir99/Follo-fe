import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";


const FindAccount = () => {
  const [form, setForm] = useState({
    email : ''
  });

  const clickReset =() => {
    router.push('/reset-password')
  }

  return (
      <SafeAreaView className="bg-Main h-full">
        <ScrollView>
          <View className="w-full justify-center">
            <View className = "">
              <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">Follo</Text>
            </View>
            <View className ="px-8">
              <Text className="text-Text font-PoppinsSemiBold text-3xl">Find your account</Text>
              <InputField 
                title="Email"
                value={form.email}
                placeHolder="moiz@follo.com"
                handleChangeText={(e) => setForm({...form, email: e})}
                containerStyles={"mt-7"}
                keyboardType="email-address"
              />
              <CustomButton 
                title="Send Reset Link"
                handlePress={clickReset}
                containerStyles={"mt-7 w-[60%] min-h-[65px] mx-auto rounded-3xl"}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  
    );
}

export default FindAccount
