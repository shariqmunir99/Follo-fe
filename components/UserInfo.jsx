import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const UserInfo = ({ user, containerStyles, showDetails }) => {
  return (
    <View
      className={`w-full bg-MainLight rounded-3xl flex-row items-center p-3 ${containerStyles}`}
    >
      <View className="">
        <Image
          source={user.dp}
          resizeMode="contain"
          className="w-12 h-12 rounded-full"
        />
      </View>
      <View
        className={`pl-3 ${showDetails === "yes" ? "flex-col justify-around" : ""}`}
      >
        <View>
          <Text className="text-Text font-PoppinsRegular">
            @{user.username}
          </Text>
        </View>
        {showDetails === "yes" && (
          // <Text className="text-Text text-5xl">Lessssgoooo</Text>
          <View className="flex-row  justify-between gap-3 pt-1">
            <View className="flex-col justify-between items-center gap-0.5">
              <Text className="text-Text font-bold">1.9k</Text>
              <Text className="text-Text text-xs opacity-50">Followers</Text>
            </View>
            <View className="flex-col justify-between items-center gap-0.5">
              <Text className="text-Text font-bold">46k</Text>
              <Text className="text-Text text-xs opacity-50">Interests</Text>
            </View>
            <View className="flex-col justify-between items-center gap-0.5">
              <Text className="font-bold text-Text">27</Text>
              <Text className="text-Text text-xs opacity-50">Posts</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default UserInfo;
