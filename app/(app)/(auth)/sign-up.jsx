import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import CheckBox from "react-native-check-box";
import { useAuth } from "@/context/AuthContext";

const SignUp = () => {
  const [organizerCheck, setOrganizerCheck] = useState(false);
  const { onRegister } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    accountfrom: "",
    password: "",
    cpassword: "",
  });

  const onClick = async () => {
    if (form.password !== form.cpassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      const result = await onRegister(
        form.email,
        form.password,
        form.username,
        "example.com",
        organizerCheck
      );
      if (result && !result.error) router.push("/sign-in");
    }
  };
  return (
    <SafeAreaView className="bg-Main h-full">
      <ScrollView>
        <View className="w-full justify-center ">
          <View className="">
            <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">
              Follo
            </Text>
          </View>
          <View className="px-8">
            <Text className="text-Text font-PoppinsSemiBold text-3xl">
              Sign up
            </Text>
            <InputField
              title="Username"
              placeHolder="Moiz Asif"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              containerStyles={"mt-7"}
            />
            <InputField
              title="Email"
              value={form.email}
              placeHolder="moiz@follo.com"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              containerStyles={"mt-7"}
              keyboardType="email-address"
            />
            <InputField
              title="Account From"
              placeHolder="Lahore/Pakistan"
              value={form.accountfrom}
              handleChangeText={(e) => setForm({ ...form, accountfrom: e })}
              containerStyles={"mt-7"}
            />
            <InputField
              title="Password"
              placeHolder="********"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              containerStyles="mt-7"
            />
            <InputField
              title="Confirm Password"
              placeHolder="********"
              value={form.cpassword}
              handleChangeText={(e) => setForm({ ...form, cpassword: e })}
              containerStyles={"mt-7"}
              confirmPasswordProp={form.password}
            />
            <View className="flex-row mt-5 items-center">
              <Text className="text-Text font-PoppinsRegular pr-2">
                Sign up as Organizer
              </Text>
              <CheckBox
                isChecked={organizerCheck}
                onClick={() => setOrganizerCheck(!organizerCheck)}
                checkedCheckBoxColor="#FAFF00"
                uncheckedCheckBoxColor="#ffffff"
              />
            </View>
            <CustomButton
              title="Sign up"
              handlePress={onClick}
              containerStyles={
                "mt-7 mb-6 w-[40%]  min-h-[65px] mx-auto rounded-3xl"
              }
              isIcon={false}
              iconOnly={false}
            />
            <View className="mx-auto mb-6 flex-row">
              <Text className="text-lg text-Text">
                Already have an account?{" "}
              </Text>
              <Link href="/sign-in" className="text-lg text-Vivid">
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
