import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { images } from "@/constants";
import UserInfo from "@/components/UserInfo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRefresh } from "@/constants/functions";
import UserRefreshing from "@/components/UserRefreshing";

const analytics = () => {
  const { id, buttonPressed } = useLocalSearchParams();
  const [pressed, setPressed] = useState("");

  const [item, setItem] = useState(null);

  useEffect(() => {
    setPressed(buttonPressed);
  }, [buttonPressed]);

  const getAnalyticsData = (eventId) => {
    const interestsList = Array.from({ length: 20 }, (_, index) => ({
      dp: images.defaultProfile,
      username: `rick_grimes`,
    }));

    const favoritesList = Array.from({ length: 20 }, (_, index) => ({
      dp: images.johnwickdp,
      username: `john_wick`,
    }));

    return { interestsList, favoritesList };
  };

  const { data, refreshing, onRefresh } = useRefresh(
    2000, // Delay in milliseconds
    getAnalyticsData,
    [id], // No parameters for now
    true
  );

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  const renderList = (list) =>
    list.map((user, index) => (
      <UserInfo user={user} containerStyles={"mx-[3%] w-[94%] mt-2"} />
    ));

  const router = useRouter();
  useEffect(() => {
    const backHandler = () => {
      router.back();
      console.log("Router.back called");
      return true; // Return true to prevent the default behavior
    };
    BackHandler.addEventListener("hardwareBackPress", backHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    };
  }, [router]);

  return (
    <SafeAreaView className="bg-Main w-full h-full">
      <View className="flex-row gap-2 justify-center items-center pb-4 pt-10 border-b-[1px] border-MainLight">
        <TouchableOpacity
          className={`${pressed == "left" ? "bg-MainLight" : ""} rounded-3xl`}
          onPress={() => setPressed("left")}
        >
          <Text className="px-7 py-2 text-Text text-lg font-PoppinsRegular">
            Favorited By
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${pressed == "right" ? "bg-MainLight" : ""} rounded-3xl`}
          onPress={() => setPressed("right")}
        >
          <Text className="px-7 py-2 text-Text text-lg font-PoppinsRegular">
            Interested By
          </Text>
        </TouchableOpacity>
      </View>
      {refreshing ? (
        <UserRefreshing />
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
          {pressed === "left"
            ? renderList(item?.favoritesList || [])
            : renderList(item?.interestsList || [])}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default analytics;
