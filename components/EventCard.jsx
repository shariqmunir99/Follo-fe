import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { TouchableOpacity } from "react-native";

const EventCard = ({
  key,
  favorites,
  interests,
  type,
  date,
  containerStyles,
  eventPic,
  onClick,
}) => {
  return (
    <TouchableOpacity
      className={`flex-row bg-MainLight px-4 py-2 rounded-2xl ${containerStyles}`}
    >
      <View className="w-[50%]">
        <Image
          source={eventPic}
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
              {favorites}
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
              {interests}
            </Text>
          </View>
        </View>
        <Text className="mt-1 text-Text text-xl font-PoppinsSemiBold">
          {date}
        </Text>
        <Text className="mt-1 text-Text text-xl font-PoppinsSemiBold">
          {type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
