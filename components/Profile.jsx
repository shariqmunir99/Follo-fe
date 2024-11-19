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
import { icons } from "../constants";
import InfoField from "./InfoField";
import { router } from "expo-router";
import EventDetails from "./EventDetails";

const Profile = ({
  user,
  isPreview,
  handlePress,
  buttonPressed,
  role,
  isFollowed,
  events,
}) => {
  //Since i have hardcoded user object user object just have two properties dp and username
  //Once backend will be integrated user object will have all its information inlcuding followers/following....
  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView className=" ">
        <View className="w-full items-center">
          <View className="mt-12">
            <Image
              source={user.dp}
              resizeMode="contain"
              className="w-[150px] h-[150px] rounded-full"
            />
          </View>
          <Text className="text-Text text-base mt-1.5">@{user.username}</Text>
          <View className="flex-row items-center justify-around w-[60%] mt-3">
            <View className="flex-col justify-between items-center">
              <Text className="text-Text font-bold">
                {role === "organizer" ? user.followers : user.following}
              </Text>
              <Text className="text-Text text-xs opacity-50">
                {role === "user" ? "Following" : "Followers"}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="text-Text font-bold">
                {role === "organizer" ? user.interests : user.interested}
              </Text>
              <Text className="text-Text text-xs opacity-50">
                {role === "user" ? "Interested" : "Interests"}
              </Text>
            </View>
            <View className="flex-col justify-between items-center">
              <Text className="font-bold text-Text">
                {role === "organizer" ? user.posts : user.favorited}
              </Text>
              <Text className="text-Text text-xs opacity-50">
                {role === "user" ? "Favorited" : "Posts"}
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full">
          {isPreview ? (
            <CustomButton
              title={isFollowed ? "Unfollow" : "Follow"}
              containerStyles="px-3 py-3 mx-auto rounded-2xl bg-Vivid mt-5"
              textStyles="text-Main"
              // handlePress={isFollowed ? handleUnfollow : handleFollow}
              isIcon={!isFollowed}
              icon={!isFollowed ? icons.plus : null}
              iconStyles="w-4 h-4 ml-2"
            />
          ) : (
            <CustomButton
              title="Edit Profile"
              containerStyles="px-3 py-3 mx-auto rounded-2xl bg-Vivid mt-5"
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
                  secondary={user.joinon}
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
                  primary={"Delete"}
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
