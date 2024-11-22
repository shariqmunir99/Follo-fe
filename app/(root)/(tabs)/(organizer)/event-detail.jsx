import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import EventDetails from "../../../../components/EventDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRefresh } from "../../../../constants/functions";
import { images } from "../../../../constants";

const eventdetail = () => {
  const {
    id,
    location,
    type,
    pic,
    favorites,
    interests,
    description,
    date,
    dp,
    username,
    role,
  } = useLocalSearchParams();

  const [item, setItem] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const backHandler = () => {
      router.back();
      return true; // Return true to prevent the default behavior
    };
    BackHandler.addEventListener("hardwareBackPress", backHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandler);
    };
  }, [router]);

  const getEventDetails = (eventId) => {
    return {
      user: {
        dp: images.johnwickdp,
        username: "john_wick",
      },
      event: {
        id: 1,
        date: "Nov 15, 2024",
        description: "Join us for an amazing night of music and entertainment.",
        location: "Central Park, New York",
        type: "Music Concert",
        favorites: 120,
        interests: 230,
        pic: images.eventPic,
      },
    };
  };

  const { data, refreshing, onRefresh } = useRefresh(
    800,
    getEventDetails,
    [id], //these empTy braces means no parameters to the function getUserData
    true
  );

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  return (
    <SafeAreaView className="h-full w-full bg-Main">
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
          {item && (
            <EventDetails
              user={item.user}
              event={item.event}
              containerStyles={"mt-10"}
              button={"delete"}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default eventdetail;
