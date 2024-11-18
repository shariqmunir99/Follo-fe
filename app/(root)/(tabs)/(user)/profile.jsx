import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../../../components/CustomButton";
import InfoField from "../../../../components/InfoField";
import { icons, images } from "../../../../constants";
import Profile from "../../../../components/Profile";

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
    <Profile
      user={{
        username: "john_wick",
        dp: images.johnwickdp,
      }}
      role={"user"}
      isPreview={false}
      handlePress={edit}
      isFollowed={true}
    />
  );
};

export default profile;
