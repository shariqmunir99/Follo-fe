import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const InteractionInfo = ({ user, containerStyles }) => {
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
      <View className="pl-3">
        <Text className="text-Text font-PoppinsRegular">@{user.username}</Text>
      </View>
    </View>
  );
};

export default InteractionInfo;
