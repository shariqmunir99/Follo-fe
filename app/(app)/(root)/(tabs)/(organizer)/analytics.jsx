import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  RefreshControl,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import UserInfo from "@/components/UserInfo";
import UserRefreshing from "@/components/UserRefreshing";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "../../../../../services/event.service";
import { useLocalSearchParams, useRouter } from "expo-router";

const analytics = () => {
  const { id, buttonPressed } = useLocalSearchParams();
  // const id = "4835d882-a9bd-4f8a-b841-fb080880d538";

  console.log("IDDD: ", id);
  const [pressed, setPressed] = useState("");

  const [item, setItem] = useState(null);

  useEffect(() => {
    setPressed(buttonPressed);
  }, [buttonPressed]);

  const button = buttonPressed === "left" ? "interested-by" : "favorited-by";
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["event"],
    id,
    button,
    queryFn: () => EventService.getAnalytics(id, buttonPressed),
  });

  const renderList = (list) =>
    list.map((user) => (
      <View key={user.userId}>
        <UserInfo user={user} containerStyles={"mx-[3%] w-[94%] mt-2"} />
      </View>
    ));

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing animation
    try {
      await refetch(); // Refetch the data from the backend
    } finally {
      setRefreshing(false); // Stop the refreshing animation
    }
  };

  return (
    <SafeAreaView className="bg-Main w-full h-full">
      <View className="flex-row gap-2 justify-center items-center pb-4 pt-10 border-b-[1px] border-MainLight">
        <TouchableOpacity
          className={`${pressed == "left" ? "bg-MainLight" : ""} rounded-3xl`}
          onPress={async () => {
            setPressed("left");
          }}
        >
          <Text className="px-7 py-2 text-Text text-lg font-PoppinsRegular">
            Favorited By
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${pressed == "right" ? "bg-MainLight" : ""} rounded-3xl`}
          onPress={async () => {
            setPressed("right");
          }}
        >
          <Text className="px-7 py-2 text-Text text-lg font-PoppinsRegular">
            Interested By
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <UserRefreshing />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor="#100425"
              colors={["#FAFF00"]}
            />
          }
        >
          {pressed === "left"
            ? renderList(data.interestedBy || [])
            : renderList(data.favoritedBy || [])}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default analytics;
