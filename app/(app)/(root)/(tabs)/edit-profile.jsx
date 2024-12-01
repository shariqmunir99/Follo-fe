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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";

const Spacer = ({ height }) => <View style={{ height }} />;
const EditProfile = () => {
  const [form, setForm] = useState({
    new_username: undefined,
    new_location: undefined,
    new_passsword: undefined,
  });

  const queryClient = useQueryClient();

  const [dp, setDp] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editProfileMutation = useMutation({
    mutationFn: UserService.editProfile,
    onSuccess: () => {
      console.log("Profile Successfully updated");
      queryClient.invalidateQueries(["profile"]);
      router.back();
    },
  });

  // const fetchProfileData = async () => {
  //   const userData = {
  //     username: "Faseeh_Ahmed",
  //     accountFrom: "Lahore/Pakistan",
  //     newPasssword: "",
  //     profilePicture: defaultDp,
  //   };

  //   setForm({
  //     username: userData.username,
  //     new_location: userData.accountFrom,
  //     newPasssword: "",
  //   });

  //   setDp(userData.profilePicture);
  // };

  // useEffect(() => {
  //   fetchProfileData();
  // }, []);

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
    editProfileMutation.mutate(form);
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
                value={form.new_username}
                placeHolder="Enter your username"
                handleChangeText={(e) => setForm({ ...form, new_username: e })}
                containerStyles={"mt-5"}
              />
              <InputField
                title="Account from"
                value={form.new_location}
                placeHolder="Account from"
                handleChangeText={(e) => setForm({ ...form, new_location: e })}
                containerStyles={"mt-5"}
              />

              <InputField
                title="New Password"
                value={form.newPasssword}
                placeHolder="Enter new password"
                handleChangeText={(e) => setForm({ ...form, new_password: e })}
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
                isLoading={editProfileMutation.isPending}
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
