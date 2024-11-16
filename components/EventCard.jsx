import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const EventCard = ({ event, user, containerStyles }) => {
  const handlePress = (event) => {
    router.push({
      pathname: "/event-detail",
      params: {
        id: event.id,
        location: event.location,
        type: event.type,
        pic: event.pic,
        favorites: event.favorites,
        interests: event.interests,
        description: event.description,
        date: event.date,
        dp: user.dp,
        username: user.username,
        role: user.role,
      },
    });
  };
  return (
    <TouchableOpacity
      className={`flex-row bg-MainLight px-4 py-2 rounded-2xl ${containerStyles}`}
      onPress={() => handlePress(event)}
    >
      <View className="w-[50%]">
        <Image
          source={event.pic}
          className="w-[145px] h-[145px] rounded-md"
          resizeMode="contain"
        />
      </View>
      <View className="flex-col py-1">
        <View className="flex-row items-baseline">
          <View>
            <Image
              source={icons.filledheart}
              className="w-4 h-4 "
              resizeMode="contain"
              style={{ tintColor: "#faff00" }}
            />
          </View>
          <View className="ml-2.5">
            <Text className="text-Text text-2xl font-PoppinsBold">
              {event.favorites}
            </Text>
          </View>
        </View>
        <View className="flex-row items-baseline mt-1">
          <View>
            <Image
              source={icons.filledstar}
              className="w-4 h-4 "
              resizeMode="contain"
              style={{ tintColor: "#faff00" }}
            />
          </View>
          <View className="ml-2.5">
            <Text className="text-Text text-2xl font-PoppinsBold">
              {event.interests}
            </Text>
          </View>
        </View>
        <Text className="mt-1 text-Text text-xl font-PoppinsSemiBold">
          {event.date}
        </Text>
        <Text className="mt-1 text-Text text-xl font-PoppinsSemiBold">
          {event.type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
