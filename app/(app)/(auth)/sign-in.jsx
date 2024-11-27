import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState("organizer");
  const { onLogin } = useAuth();
  const submit = async () => {
    //TODO: Add Input Validation for email and password.
    console.log("Login");
    const result = await onLogin(form.email, form.password);
    console.log(result);
    console.log(result);
    if (result && result.error) {
      console.log(result.msg);
    } else {
      if (result.data.result.roleName === "Organizer")
        router.replace("(organizer)/dashboard");
      else router.replace("(user)/home");
    }
  };
  return (
    <SafeAreaView className="bg-Main h-full">
      <ScrollView>
        <View className="w-full justify-center">
          <View className="">
            <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">
              Follo
            </Text>
          </View>
          <View className="px-8">
            <Text className="text-Text font-PoppinsSemiBold text-3xl">
              Log in
            </Text>
            <InputField
              title="Email"
              value={form.email}
              placeHolder="moiz@follo.com"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              containerStyles={"mt-7"}
              keyboardType="email-address"
            />
            <InputField
              title="Password"
              value={form.password}
              placeHolder="********"
              handleChangeText={(e) => setForm({ ...form, password: e })}
              containerStyles={"mt-7"}
            />
            <CustomButton
              title="Log in"
              containerStyles={"mt-7 w-[40%]  min-h-[65px] mx-auto rounded-3xl"}
              handlePress={submit}
              isLoading={isSubmitting}
              isIcon={false}
              iconOnly={false}
            />
            <Link
              href="/forget-password"
              className="text-Text text-base mx-auto mt-8"
            >
              Forget Password
            </Link>
            <View className="mt-5 mx-auto flex-row">
              <Text className="text-lg text-Text">Don't have an account? </Text>
              <Link href="/sign-up" className="text-lg text-Vivid">
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
