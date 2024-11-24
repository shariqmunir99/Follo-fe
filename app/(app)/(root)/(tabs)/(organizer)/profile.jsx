import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  BackHandler,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";

import ProfileRefreshing from "../../../../components/ProfileRefreshing";
import CustomButton from "@/components/CustomButton";
import InfoField from "@/components/InfoField";
import { icons, images } from "@/constants";
import Profile from "@/components/Profile";
import { useRefresh } from "@/constants/functions";
import { useAuth } from "@/context/AuthContext";

export const profile = () => {
  const [user, setUser] = useState(null);
  const { onLogout } = useAuth();

  const getUserData = () => {
    return {
      dp: images.johnwickdp, // Default profile image
      username: "john_wick",
      joinon: "01/01/2024",
      location: "Chicago/USA",
      followers: "11.3k",
      interests: "2.1k",
      posts: 124,
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
    4000,
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
        <ProfileRefreshing isPreview={false} />
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
              isPreview={false}
              handlePress={edit}
              isFollowed={true}
              handleLogout={onLogout}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default profile;
