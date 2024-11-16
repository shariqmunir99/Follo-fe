import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { icons, images } from "../constants";
import InteractionButton from "./InteractionButton";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const EventDetails = ({ user, event, button, containerStyles }) => {
  const screenHeight = Dimensions.get("window").height;
  const [isFollowed, setIsFollowed] = useState(false);

  const organizerPressedInterest = (eventId) => {
    router.push({
      pathname: "/analytics",
      params: {
        id: eventId,
        buttonPressed: "right",
      },
    });
  };
  const organizerPressedFavorite = (eventId) => {
    router.push({
      pathname: "/analytics",
      params: {
        id: eventId,
        buttonPressed: "left",
      },
    });
  };
  const handleFollowButtonPress = () => {
    if (isFollowed) {
      //remove this organizer from the folLowing list
    } else {
      //add this org in the following list
    }
    setIsFollowed(true);
  };

  return (
    <SafeAreaView className={`bg-Main w-full ${containerStyles}`}>
      <View className="flex-col border-b-[1px] border-MainLight pb-2 px-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center w-[50%] mt-3">
            <View>
              <Image
                source={user.dp}
                resizeMode="contain"
                className="w-12 h-12 rounded-full"
              />
            </View>
            <View className="flex-col ml-2">
              <View>
                <Text className="text-Text text-xs">@{user.username}</Text>
              </View>
              <View>
                <Text className="text-Vivid opacity-50 text-xs">
                  {event.date}
                </Text>
              </View>
            </View>
          </View>
          {button === "delete" && (
            <View>
              <CustomButton
                iconOnly={true}
                isIcon={true}
                icon={icons.bin}
                containerStyles={"bg-Vivid p-2 rounded-xl w-9 h-9"}
                iconStyles={"w-4 h-4"}
              />
            </View>
          )}
          {button === "follow" && !isFollowed && (
            <TouchableOpacity
              onPress={handleFollowButtonPress}
              className="bg-Vivid p-2 rounded-lg"
            >
              <Image
                source={icons.plus}
                className={`w-4 h-4`}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        <View className="py-2">
          <Text className="text-Text opacity-90">{event.description}</Text>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-Text opacity-90">{event.location}</Text>
          </View>
          <View>
            <Text className="text-Text opacity-90">{event.type}</Text>
          </View>
        </View>
        <View className="py-2">
          <Image
            source={event.pic}
            className={`w-full rounded-xl`}
            style={{ height: screenHeight * 0.3 }}
          />
        </View>
        <View className="py-2 flex-row justify-between items-baseline">
          <InteractionButton
            user={user}
            iconFor={"favorite"}
            onPress={organizerPressedFavorite}
            value={event.favorites}
            eventId={event.id}
          />
          <InteractionButton
            user={user}
            iconFor={"interest"}
            onPress={organizerPressedInterest}
            value={event.interests}
            eventId={event.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventDetails;
