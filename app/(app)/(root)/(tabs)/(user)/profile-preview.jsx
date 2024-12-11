/* eslint-disable react-hooks/rules-of-hooks */
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
import CustomButton from "@/components/CustomButton";
import InfoField from "@/components/InfoField";
import { icons, images } from "@/constants";
import Profile from "@/components/Profile";
import { useLocalSearchParams } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { useRefresh } from "@/constants/functions";
import ProfileRefreshing from "@/components/ProfileRefreshing";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "../../../../../services/user.service";

const profilepreview = () => {
  const [user, setUser] = useState(null);
  const organizer_id = "b80fa63f-4d82-49f6-a09f-df24bf517ccc";
  const dp =
    "https://drive.google.com/thumbnail?id=1-Hrl25XDgrfsWd9Zx1bp5324jxVUWbKP";
  const username = "Shariq Munir";
  // const { organizer_id, dp, username } = useLocalSearchParams();

  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["profile", organizer_id],
    queryFn: () => UserService.fetchOrganizerStats(organizer_id),
  });

  // const getUserData = () => {
  //   return {
  //     dp: images.johnwickdp,
  //     username: "john_wick",
  //     joinon: "01/01/2024",
  //     location: "Chicago/USA",
  //     following: "11.3k",
  //     interested: "2.1k",
  //     favorited: "1.5k",
  //   };
  // };

  useEffect(() => {
    if (isSuccess && data) {
      setUser({
        organizer_id,
        profilePicUrl: dp,
        username: username,
        followers: data.followers,
        interactions: data.interactions,
        posts: data.posts,
      });
      console.log(data);
    }
  }, [isSuccess, data]);

  if (isError) {
    console.log(error);
  }
  // const {
  //   data: userData,
  //   refreshing,
  //   onRefresh,
  // } = useRefresh(
  //   1000,
  //   getUserData,
  //   [], //these empTy braces means no parameters to the function getUserData
  //   true
  // );

  // useEffect(() => {
  //   if (userData) {
  //     setUser(userData); // Set the fetched user data
  //   }
  // }, [userData]);

  return (
    <SafeAreaView className="bg-Main h-full">
      {false ? (
        <ProfileRefreshing isPreview={true} />
      ) : (
        <ScrollView
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     progressBackgroundColor="transparent"
        //     colors={["#FAFF00"]}
        //   />
        // }
        >
          {user && (
            <Profile
              user={user}
              role={"Organizer"}
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
