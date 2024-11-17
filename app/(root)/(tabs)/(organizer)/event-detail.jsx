import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import EventDetails from "../../../../components/EventDetails";
import { useLocalSearchParams, useRouter } from "expo-router";

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

  return (
    <SafeAreaView className="h-full w-full bg-Main">
      <ScrollView>
        <EventDetails
          user={{ username, dp, role }}
          event={{
            id: id,
            location: location,
            type: type,
            pic: pic,
            favorites: favorites,
            interests: interests,
            description: description,
            date: date,
          }}
          containerStyles={"mt-10"}
          button={"delete"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default eventdetail;
