import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";


const SignUp = () => {
  const [form, setForm] = useState({
    username:'',
    email : '',
    password : '',
    cpassword : ''
  });

  const onClick = () => {
    if (form.password !== form.cpassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      router.push('/sign-in');
    }
  };
  return (
    <SafeAreaView className="bg-Main h-full">
      <ScrollView>
        <View className="w-full justify-center ">
          <View className = "">
            <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">Follo</Text>
          </View>
          <View className ="px-8">
            <Text className="text-Text font-PoppinsSemiBold text-3xl">Sign up</Text>
            <InputField 
              title="Username"
              placeHolder="Moiz Asif"
              value={form.username}
              handleChangeText={(e) => setForm({...form, username: e})}
              containerStyles={"mt-7"}
            />
            <InputField 
                title="Email"
                value={form.email}
                placeHolder="moiz@follo.com"
                handleChangeText={(e) => setForm({...form, email: e})}
                containerStyles={"mt-7"}
                keyboardType="email-address"
            />
            <InputField 
              title="Password"
              placeholder="********"
              value={form.password}
              handleChangeText = {(e) => setForm({...form, password: e})}
              containerStyles="mt-7"
            />
            <InputField 
              title="Confirm Password"
              placeHolder="********"
              value={form.cpassword}
              handleChangeText = {(e) => setForm({...form, cpassword: e})}
              containerStyles={"mt-7"}
              confirmPasswordProp = {form.password}
            />
            <CustomButton 
              title="Sign up"
              handlePress={onClick}
              containerStyles={"mt-7 mb-10 w-[40%]  min-h-[65px] mx-auto rounded-3xl"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default SignUp;
