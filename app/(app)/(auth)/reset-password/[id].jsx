import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { useRouter, useLocalSearchParams } from "expo-router"; // Import hooks for routing
import { useAuth } from "@/context/AuthContext";

const ResetPassword = () => {
  const { onResetPassword } = useAuth();
  const [form, setForm] = useState({
    npassword: "",
    cpassword: "",
  });
  const [resetToken, setResetToken] = useState(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Extract the token from the current URL path
    if (params?.id) {
      setResetToken(params.id);
    }
  }, [params]);

  const clickReset = async () => {
    if (form.npassword !== form.cpassword) {
      Alert.alert("Error", "Passwords do not match");
    } else if (!resetToken) {
      Alert.alert("Error", "Invalid reset token");
    } else {
      console.log(resetToken);
      const result = await onResetPassword(resetToken, form.npassword);
      if (result && !result.error) {
        alert("Password Reset Successfully");
        router.replace("/sign-in");
      }
    }
  };

  return (
    <SafeAreaView className="bg-Main h-full">
      <ScrollView>
        <View className="w-full justify-center">
          <View>
            <Text className="font-Rakkas text-Vivid text-8xl text-center pt-[50px]">
              Follo
            </Text>
          </View>
          <View className="px-8">
            <Text className="text-Text font-PoppinsSemiBold text-3xl">
              Reset Password
            </Text>
            <InputField
              title="New Password"
              placeholder="********"
              value={form.npassword}
              handleChangeText={(e) => setForm({ ...form, npassword: e })}
              containerStyles={"mt-7"}
            />
            <InputField
              title="Confirm Password"
              placeholder="********"
              value={form.cpassword}
              handleChangeText={(e) => setForm({ ...form, cpassword: e })}
              containerStyles={"mt-7"}
            />
            <CustomButton
              title="Reset"
              handlePress={clickReset}
              containerStyles={"mt-7 w-[40%] min-h-[65px] mx-auto rounded-3xl"}
              isIcon={false}
              iconOnly={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
