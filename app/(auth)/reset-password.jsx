import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

const ResetPassword = () => {
    const [form, setForm] = useState({
        npassword:'',
        cpassword : ''
    });

    const clickReset = () =>{
        if (form.npassword !== form.cpassword) {
            Alert.alert("Error", "Passwords do not match");
        } else {
            router.push('/sign-in');
        }
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
                        placeholder="********"
                        value={form.npassword}
                        handleChangeText = {(e) => setForm({...form, npassword: e})}
                        containerStyles={"mt-7"}
                    />
                    <InputField 
                        title="Confirm Password"
                        placeholder="********"
                        value={form.cpassword}
                        handleChangeText = {(e) => setForm({...form, cpassword: e})}
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
