import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons, images } from "../constants";
import InfoField from "./InfoField";
import { router } from "expo-router";
import EventDetails from "./EventDetails";

const Profile = ({
  user,
  isPreview,
  handlePress,
  role,
  isFollowed,
  events,
  handleLogout,
}) => {
  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView className=" ">
        <View className="w-full items-center">
          <View className="mt-12">
            <Image
              source={{ uri: user.profilePicUrl }}
              resizeMode="contain"
              className="w-[150px] h-[150px] rounded-full"
            />
          </View>
          <Text className="text-Text text-base mt-1.5">@{user.username}</Text>
          <View className="flex-row items-center justify-around mt-3">
            <View className="flex-col pr-3 justify-between items-center">
              <Text className="text-Text font-bold">
                {role === "Organizer" ? user.followers : user.following}
              </Text>
              <Text className="text-Text text-xs opacity-50">
                {role === "User" ? "Following" : "Followers"}
              </Text>
            </View>
            <View className="flex-col px-1 justify-between items-center">
              <Text className="text-Text font-bold">
                {role === "Organizer" ? user.interactions : user.interests}
              </Text>
              <Text className="text-Text text-xs opacity-50">
                {role === "User" ? "Interested" : "Interactions"}
              </Text>
            </View>
            <View className="flex-col pl-3 justify-between items-center">
              <Text className="font-bold text-Text">
                {role === "Organizer" ? user.posts : user.favorited}
              </Text>
              <Text className="text-Text text-xs opacity-50">
                {role === "User" ? "Favorited" : "Posts"}
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full">
          {isPreview ? (
            <CustomButton
              title={isFollowed ? "Unfollow" : "Follow"}
              containerStyles="px-4 py-2 mx-auto rounded-xl bg-Vivid mt-5"
              textStyles="text-Main"
              // handlePress={isFollowed ? handleUnfollow : handleFollow}
              isIcon={!isFollowed}
              icon={!isFollowed ? icons.plus : null}
              iconStyles="w-3 h-3 ml-2"
            />
          ) : (
            <CustomButton
              title="Edit Profile"
              containerStyles="px-4 py-2 mx-auto rounded-xl bg-Vivid mt-5"
              textStyles="text-Main"
              handlePress={handlePress}
              isIcon={false}
            />
          )}
          <View
            className={`flex-col items-center mt-4  ${isPreview ? "border-MainLight border-t-[1px]" : " px-2"}`}
          >
            {!isPreview ? (
              <>
                <InfoField
                  primary={"Joined on"}
                  secondary={user.createdAt.split("T")[0]}
                  icon={icons.calender}
                  containerStyles={"mt-3"}
                />
                <InfoField
                  primary={"Account from"}
                  secondary={user.location}
                  icon={icons.location}
                  containerStyles={"mt-3"}
                />
                <InfoField
                  primary={"Delete Account"}
                  icon={icons.bin}
                  containerStyles={"mt-3"}
                />
                <CustomButton
                  containerStyles={"w-full rounded-2xl bg-Vivid mt-9 p-3 mb-10"}
                  isIcon={true}
                  title={"Logout"}
                  icon={icons.logout}
                  textStyles={"text-Main"}
                  iconStyles={"ml-1"}
                  handlePress={() => {
                    handleLogout();
                    router.replace("/sign-in");
                  }}
                />
              </>
            ) : (
              <>
                {events && events.length > 0 ? (
                  events.map((event, index) => (
                    <EventDetails
                      key={index}
                      user={user}
                      event={event} // Pass each event data to EventDetails component
                    />
                  ))
                ) : (
                  <Text className="text-Text text-center mt-4">
                    No events available.
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
