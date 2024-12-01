import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import InfoCard from "@/components/InfoCard";
import EventCard from "@/components/EventCard";
import DashboardRefreshing from "@/components/DashboardRefreshing";
import { icons, images } from "@/constants";
import { router, Stack } from "expo-router";
import { useRefresh } from "@/constants/functions";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../../../../services/user.service";

const dashboard = () => {
  const [followers, setFollowers] = useState("");
  const [interactions, setInteractions] = useState("");
  const [events, setEvents] = useState([]);
  // const [newEvents, setNewEvents] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: UserService.getDashboard,
  });

  const dp = images.johnwickdp;
  const username = "john_wick";
  const role = "organizer";

  // const [refreshing, onRefresh] = useRefresh(2000);

  const getEventData = (interactions, followers) => {
    const events = [
      {
        id: 1,
        date: "Nov 15, 2024",
        description: "Join us for an amazing night of music and entertainment.",
        location: "Central Park, New York",
        type: "Music Concert",
        favorites: 120,
        interests: 230,
        pic: images.eventPic,
      },
      {
        id: 2,
        date: "Nov 20, 2024",
        description: "Explore beautiful artworks from renowned artists.",
        location: "Art Gallery, San Francisco",
        type: "Art Exhibition",
        favorites: 85,
        interests: 150,
        pic: images.eventPic,
      },
      {
        id: 3,
        date: "Dec 1, 2024",
        description: "A gathering of tech enthusiasts and innovators.",
        location: "Tech Hall, Silicon Valley",
        type: "Tech Conference",
        favorites: 300,
        interests: 450,
        pic: images.eventPic,
      },
      {
        id: 4,
        date: "Dec 10, 2024",
        description: "Enjoy delicious food from around the world.",
        location: "Food Street, Los Angeles",
        type: "Food Festival",
        favorites: 200,
        interests: 320,
        pic: images.eventPic,
      },
    ];

    return { interactions, followers, events };
  };

  // if (dashboardQuery.isLoading) {
  //   return <DashboardRefreshing />;
  // }
  const params = ["11.3k", "2.1k"];

  // useEffect(() => {
  //   if (data) {
  //     setFollowers(data.followers);
  //     setInteractions(data.interactions);
  //     setEvents(data.events);
  //     setIsLoading(false); ////shariq bhai this state ensure k first time jb is page pr ayin
  //     ////to tb tk kuch show na ho jb tk data fetch nai kr letay
  //   }
  // }, [data]);

  return (
    <SafeAreaView className=" bg-Main h-full">
      <Stack.Screen />
      {isLoading ? (
        <DashboardRefreshing />
      ) : (
        <ScrollView className="mx-3">
          <View className="mt-10">
            <View>
              <Text className="text-Vivid font-PoppinsExtraBold text-xl">
                Last 30 Days
              </Text>
            </View>
            <InfoCard
              heading="Followers"
              data={data.Followers}
              icon={icons.followers}
              containerStyles={"mt-3.5"}
            />
            <InfoCard
              heading="Interactions"
              data={data.Interactions}
              icon={icons.interactions}
              containerStyles={"mt-2.5"}
            />
          </View>
          <View className="mt-3.5">
            <View>
              <Text className="text-Vivid font-PoppinsExtraBold text-xl">
                Top Events
              </Text>
            </View>
            <View className="pb-10 mt-2">
              {data.Events.map((event, index) => (
                <View key={event.id}>
                  <EventCard
                    event={event}
                    user={{ dp, username, role }}
                    containerStyles="mt-2"
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default dashboard;
