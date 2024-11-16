import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { images } from "../../../../constants";
import InteractionInfo from "../../../../components/InteractionInfo";
import { useLocalSearchParams } from "expo-router";

const analytics = () => {
  const { id, buttonPressed } = useLocalSearchParams();
  const [pressed, setPressed] = useState("");

  useEffect(() => {
    setPressed(buttonPressed);
  }, [buttonPressed]);

  const interestsList = Array.from({ length: 20 }, (_, index) => ({
    dp: images.defaultProfile,
    username: `rick_grimes`,
  }));

  const favoritesList = Array.from({ length: 20 }, (_, index) => ({
    dp: images.johnwickdp,
    username: `john_wick`,
  }));

  const renderList = (list) =>
    list.map((user, index) => (
      <InteractionInfo user={user} containerStyles={"mx-[3%] w-[94%] mt-2"} />
    ));

  return (
    <SafeAreaView className="bg-Main w-full h-full">
      <View className="flex-row gap-2 justify-center items-center pb-4 pt-10 border-b-[1px] border-MainLight">
        <TouchableOpacity
          className={`${pressed == "left" ? "bg-MainLight" : ""} rounded-3xl`}
          onPress={() => setPressed("left")}
        >
          <Text className="px-7 py-2 text-Text text-lg font-PoppinsRegular">
            Favorited By
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${pressed == "right" ? "bg-MainLight" : ""} rounded-3xl`}
          onPress={() => setPressed("right")}
        >
          <Text className="px-7 py-2 text-Text text-lg font-PoppinsRegular">
            Interested By
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {pressed === "left"
          ? renderList(favoritesList)
          : renderList(interestsList)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default analytics;