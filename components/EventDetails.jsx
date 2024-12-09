import { SafeAreaView, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { icons, images } from "../constants";
import InteractionButton from "./InteractionButton";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../services/user.service";
import { useAuth } from "@/context/AuthContext";

const EventDetails = ({
  user,
  event,
  button,
  containerStyles,
  interactionButtonPressed,
  interactionType,
}) => {
  const { authState } = useAuth();
  const role = authState.role;
  const screenHeight = Dimensions.get("window").height;
  const [isFollowed, setIsFollowed] = useState(event.isFollowing);
  const editHandlePress = () => {
    router.replace({
      pathname: "/edit-event",
      params: {
        id: event.id,
        name: event.name,
        date: event.date,
        description: event.description,
        type: event.type,
        city: event.city,
        country: event.country,
        venue: event.venue,
        pic: event.pic,
      },
    });
  };

  const followMutation = useMutation({
    mutationFn: UserService.addFollow,
    onSuccess: () => setIsFollowed(true),
  });

  const interestMutation = useMutation({
    mutationFn: UserService.addInterest,
    onSuccess: () => (event.isInterested = !event.isInterested),
  });

  const favoriteMutation = useMutation({
    mutationFn: UserService.addFavorite,
    onSuccess: () => (event.isFavorited = !event.isFavorited),
  });

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
    followMutation.mutate(user.organizer_id);
  };

  if (interestMutation.isError) {
    if (interestMutation.error.response.data.status === 409)
      Alert.alert("You are already interested.");
  }

  if (followMutation.isError) {
    if (followMutation.error.response.data.status === 409)
      Alert.alert("You are already following this user.");
  }

  if (favoriteMutation.isError) {
    if (favoriteMutation.error.response.data.status === 409)
      Alert.alert("You have already favorited.");
  }

  const handleInterestToggle = () => {
    if (role === "Organizer") {
      organizerPressedInterest(event.id);
    } else {
      if (event.isInterested) {
        //delete Mutation
      } else {
        interestMutation.mutate(event.id);
      }
    }
  };

  const handleFavoriteToggle = () => {
    if (role === "Organizer") {
      organizerPressedFavorite(event.id);
    } else {
      if (event.isFavorited) {
        //delete Mutation
      } else {
        favoriteMutation.mutate(event.id);
      }
    }
  };

  return (
    <SafeAreaView className={`bg-Main w-full ${containerStyles}`}>
      <View className="flex-col border-b-[1px] border-MainLight pb-2 px-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center w-[50%] mt-3">
            <TouchableOpacity
              onPress={
                role === "User"
                  ? () =>
                      router.push({
                        pathname: "/profile-preview",
                        params: { dp: user.dp, username: user.username },
                      })
                  : null
              }
            >
              <Image
                source={{ uri: user.dp }}
                resizeMode="contain"
                className="w-12 h-12 rounded-full"
              />
            </TouchableOpacity>
            <View className="flex-col ml-2">
              <TouchableOpacity
                onPress={
                  role === "User"
                    ? () =>
                        router.push({
                          pathname: "/profile-preview",
                          params: { dp: user.dp, username: user.username },
                        })
                    : null
                }
              >
                <Text className="text-Text text-base">@{user.username}</Text>
              </TouchableOpacity>
              <View>
                <Text className="text-Vivid opacity-50 text-sm">
                  {event.createdAt}
                </Text>
              </View>
            </View>
          </View>
          {button === "delete" && (
            <View className="flex-row ">
              <CustomButton
                iconOnly={true}
                isIcon={true}
                icon={icons.edit}
                containerStyles={"bg-Vivid p-2 rounded-xl w-9 h-9"}
                iconStyles={"w-8 h-8"}
                handlePress={editHandlePress}
              />
              <CustomButton
                iconOnly={true}
                isIcon={true}
                icon={icons.bin}
                containerStyles={"bg-Vivid p-2 rounded-xl w-9 h-9 ml-2"}
                iconStyles={"w-4 h-4"}
                handlePress={() => console.log("Delete")}
              />
            </View>
          )}
          {button === "follow" && !event.isFollowing && (
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
        <View className="pt-2">
          <Text className="text-Text opacity-90 text-lg ">
            {event.name} {`(${event.type})`}
          </Text>
        </View>
        <View className="pb-1">
          <Text className="text-slate-300 opacity-90 text-base">
            {event.description}
          </Text>
        </View>
        <View className="flex-col justify-between ">
          <View className="flex-1">
            <Text className="text-Text opacity-90  text-sm">
              {event.venue}, {event.city}, {event.country}
            </Text>
          </View>
        </View>
        <View className="pt-3 pb-2">
          <Image
            source={{ uri: event.pic }}
            className={`w-full rounded-xl`}
            style={{ height: screenHeight * 0.3 }}
          />
        </View>
        <View
          className={`py-2 flex-row ${interactionButtonPressed === "yes" ? "justify-center" : "justify-between"} items-baseline`}
        >
          <InteractionButton
            user={user}
            iconFor={"interest"}
            onPress={handleInterestToggle}
            value={event.interests}
            eventId={event.id}
            alreadyPressed={event.isInterested}
          />

          <InteractionButton
            user={user}
            iconFor={"favorite"}
            onPress={handleFavoriteToggle}
            value={event.favourites}
            eventId={event.id}
            alreadyPressed={event.isFavorited}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventDetails;
