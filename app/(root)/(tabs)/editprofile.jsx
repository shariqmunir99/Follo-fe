import { StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from '../../../components/InputField';
import CustomButton from "../../../components/CustomButton";
import { Link, router } from "expo-router";
import defaultDp from '../../../assets/icons/defaultProfile.png';

const Spacer = ({ height }) => <View style={{ height }} />;
const editprofile = () => {
  const [form, setForm] = useState({
    username : '',
    accountFrom : '',
    oldPassword : '',
    newPasssword : ''
  });
   const [dp, setDp] = useState(null);
    useEffect(() => {
        if (dp === null) {
          setDp(defaultDp);
        }
    }, [dp]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    router.push('/profile');
  }
  return (
    <SafeAreaView className = " bg-Main h-full">
    <ScrollView className=" ">
    
        <View className="w-full h-[45%] items-center">
        
            <View className=" mt-5">
                <Image
                    source={dp} 
                    resizeMode='contain'
                    className = "w-[150px] h-[150px] rounded-full"
                />
            </View>
            <View style={{ height: 20 }} />
            <View className="w-full justify-center">
            <View className ="px-8">
            
            <InputField 
                title="Username"
                value={form.username}
                placeHolder="Faseeh@follo.com"
                handleChangeText={(e) => setForm({...form, username: e})}
                containerStyles={"mt-7"}
                keyboardType="username-address"
              />
              <InputField 
                title="Account from"
                value={form.accountFrom}
                placeHolder="Account 1"
                handleChangeText={(e) => setForm({...form, accountFrom: e})}
                containerStyles={"mt-7"}
              />
           <InputField 
                title="Old Password"
                value={form.oldPassword}
                placeHolder="********"
                handleChangeText={(e) => setForm({...form, oldPassword: e})}
                containerStyles={"mt-7"}
              />
        <InputField 
                title="New Password"
                value={form.newPasssword}
                placeHolder="********"
                handleChangeText={(e) => setForm({...form, newPasssword: e})}
                containerStyles={"mt-7"}
              />
                <View style={{ height: 20 }} />
          
          
                <CustomButton 
                    title="Update"
                    containerStyles={" w-[38%]  min-h-[50px] mx-auto rounded-2xl bg-Vivid"}
                    textStyles={"text-Main"}
                    handlePress={submit}
                    isLoading={isSubmitting}
                />
          </View>
          </View>
          </View>
          
    </ScrollView>
</SafeAreaView>
);
}
export default editprofile;
