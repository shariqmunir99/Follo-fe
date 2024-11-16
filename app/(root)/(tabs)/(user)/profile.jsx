import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../../../components/CustomButton";
import InfoField from "../../../../components/InfoField";
import { icons, images } from "../../../../constants";

export const profile = () => {
  const [dp, setDp] = useState(null);
  useEffect(() => {
    if (dp === null) {
      setDp(images.defaultProfile);
    }
  }, [dp]);
  const edit = async () => {
    router.push("../edit-profile");
  };
  const [isEdit, setIsEdit] = useState(false);

  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView className=" ">
        <View className="w-full h-[45%] items-center">
          <View className=" mt-10">
            <Image
              source={dp}
              resizeMode="contain"
              className="w-[150px] h-[150px] rounded-full"
            />
          </View>
          <Text className="text-Text text-lg mt-1.5">@m_moizz</Text>
          <View className="flex-row items-center justify-around w-[60%] mt-5">
            <View className="flex-col justify-between items-center">
              <Text className="text-Text font-bold">1.9k</Text>
              <Text className="text-Text text-xs opacity-50">Followers</Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-Text font-bold">46k</Text>
              <Text className="text-Text text-xs opacity-50">Interests</Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="font-bold text-Text">27</Text>
              <Text className="text-Text text-xs opacity-50">Posts</Text>
            </View>
          </View>
        </View>
        <View className="w-full mb-20">
          <CustomButton
            title="Edit Profile"
            containerStyles={
              " w-[38%]  min-h-[50px] mx-auto rounded-2xl bg-Vivid"
            }
            textStyles={"text-Main"}
            handlePress={edit}
            isIcon={false}
            iconOnly={false}
          />
          <View className="flex-col items-center mt-5 px-2">
            <InfoField
              primary={"Joined on"}
              secondary={"21/10/2024"}
              icon={icons.calender}
              containerStyles={"mt-3"}
            />
            <InfoField
              primary={"Account from"}
              secondary={"Lahore, Pakistan"}
              icon={icons.location}
              containerStyles={"mt-3"}
            />
            <InfoField
              primary={"Delete"}
              icon={icons.bin}
              containerStyles={"mt-3"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
