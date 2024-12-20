import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { format } from "date-fns";

const EventCard = ({ event, containerStyles }) => {
  const handlePress = (event) => {
    router.push({
      pathname: "/event-detail",
      params: {
        id: event.id,
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
          source={{
            uri: event.imageUrl,
          }}
          className="w-[145px] h-[145px] rounded-md"
          resizeMode="cover"
        />
      </View>
      <View className="flex-col py-1">
        <View className="flex-row items-baseline">
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
              {event.interactions}
            </Text>
          </View>
        </View>

        <Text className="mt-1 text-gray-300 text-lg font-PoppinsSemiBold">
          {event.type}
        </Text>
        <Text className="mt-1 text-gray-300 text-lg font-PoppinsSemiBold">
          {event.city}
        </Text>
        <Text className="mt-1 text-gray-300 text-lg font-PoppinsSemiBold">
          {format(new Date(event.date), "do MMM, yyyy")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
