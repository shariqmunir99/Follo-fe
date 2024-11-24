import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import defaultDp from "@/assets/icons/defaultProfile.png";

const Spacer = ({ height }) => <View style={{ height }} />;

const EditProfile = () => {
  const [form, setForm] = useState({
    username: "",
    accountFrom: "",
    oldPassword: "",
    newPasssword: "",
  });

  const [dp, setDp] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfileData = async () => {
    const userData = {
      username: "Faseeh_Ahmed",
      accountFrom: "Lahore/Pakistan",
      oldPassword: "********",
      newPasssword: "",
      profilePicture: defaultDp,
    };

    setForm({
      username: userData.username,
      accountFrom: userData.accountFrom,
      oldPassword: "",
      newPasssword: "",
    });

    setDp(userData.profilePicture);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setDp({ uri: result.assets[0].uri });
    }
  };

  const submit = async () => {
    // Submit the form data
    console.log("Updated Profile Data:", form);
    router.back();
  };

  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView>
        <View className="w-full h-[45%] items-center">
          <View className="mt-5 relative">
            <Image
              source={dp}
              resizeMode="contain"
              className="w-[150px] h-[150px] rounded-full"
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 5,
              }}
              onPress={pickImage}
            >
              <MaterialIcons name="edit" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <Spacer height={20} />
          <View className="w-full justify-center mt-10">
            <View className="px-8">
              <InputField
                title="Username"
                value={form.username}
                placeHolder="Enter your username"
                handleChangeText={(e) => setForm({ ...form, username: e })}
                containerStyles={"mt-5"}
              />
              <InputField
                title="Account from"
                value={form.accountFrom}
                placeHolder="Account from"
                handleChangeText={(e) => setForm({ ...form, accountFrom: e })}
                containerStyles={"mt-5"}
              />
              <InputField
                title="Old Password"
                value={form.oldPassword}
                placeHolder="Enter old password"
                handleChangeText={(e) => setForm({ ...form, oldPassword: e })}
                containerStyles={"mt-5"}
              />
              <InputField
                title="New Password"
                value={form.newPasssword}
                placeHolder="Enter new password"
                handleChangeText={(e) => setForm({ ...form, newPasssword: e })}
                containerStyles={"mt-5"}
              />
              <Spacer height={20} />
              <CustomButton
                title="Update"
                containerStyles={
                  " w-[38%]  min-h-[50px] mx-auto rounded-2xl bg-Vivid"
                }
                textStyles={"text-Main"}
                handlePress={submit}
                isLoading={isSubmitting}
                isIcon={false}
                iconOnly={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
