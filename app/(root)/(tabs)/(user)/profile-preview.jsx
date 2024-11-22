import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../../../components/CustomButton";
import InfoField from "../../../../components/InfoField";
import { icons, images } from "../../../../constants";
import Profile from "../../../../components/Profile";
import { useLocalSearchParams } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { useRefresh } from "../../../../constants/functions";

const profilepreview = () => {
  const [user, setUser] = useState(null);

  const getUserData = () => {
    return {
      dp: images.johnwickdp,
      username: "john_wick",
      joinon: "01/01/2024",
      location: "Chicago/USA",
      following: "11.3k",
      interested: "2.1k",
      favorited: "1.5k",
    };
  };

  const edit = async () => {
    router.push("../edit-profile");
  };

  const {
    data: userData,
    refreshing,
    onRefresh,
  } = useRefresh(
    1000,
    getUserData,
    [], //these empTy braces means no parameters to the function getUserData
    true
  );

  useEffect(() => {
    if (userData) {
      setUser(userData); // Set the fetched user data
    }
  }, [userData]);

  return (
    <SafeAreaView className="bg-Main h-full">
      {refreshing ? (
        <View className="flex-1 bg-Main justify-center items-center">
          <Text className="text-Vivid font-PoppinsBold mt-2">Loading...</Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor="transparent"
              colors={["#FAFF00"]}
            />
          }
        >
          {user && (
            <Profile
              user={user}
              role={"organizer"}
              isPreview={true}
              //handlePress={edit}
              isFollowed={false}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default profilepreview;
