import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import EventDetails from "../../../../components/EventDetails";
import { useLocalSearchParams } from "expo-router";

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
