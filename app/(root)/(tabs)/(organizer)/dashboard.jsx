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
import InfoCard from "../../../../components/InfoCard";
import EventCard from "../../../../components/EventCard";
import { icons, images } from "../../../../constants";
import { router, useLocalSearchParams } from "expo-router";
import { useRefresh } from "../../../../constants/functions";
import ShimmerEffect from "../../../../components/ShimmerEffect";

const dashboard = () => {
  const [followers, setFollowers] = useState("");
  const [interactions, setInteractions] = useState("");
  const [events, setEvents] = useState([]);
  // const [newEvents, setNewEvents] = useState([]);

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
  const params = ["11.3k", "2.1k"];
  const { data, refreshing, onRefresh } = useRefresh(
    5000,
    getEventData,
    params,
    true
  );

  // const addNewEvent = () => {
  //   const newEvent = {
  //     id: events.length + 1,
  //     date: "Dec 25, 2024",
  //     description: "Celebrate the holidays with us in style!",
  //     location: "Holiday Plaza, Chicago",
  //     type: "Christmas Party",
  //     favorites: 50,
  //     interests: 80,
  //     pic: images.eventPic,
  //   };

  //   // Append the new event to the `newEvents` array
  //   setNewEvents((prev) => [...prev, newEvent]);
  // };
  useEffect(() => {
    if (data) {
      setFollowers(data.followers);
      setInteractions(data.interactions);
      setEvents(data.events);
    }
  }, [data]);

  return (
    <SafeAreaView className=" bg-Main h-full">
      {refreshing ? (
        //<View className="bg-gray-950 h-[25%] w-[96%] ml-[2%]  mt-10 rounded-2xl"/>
        <>
          <ShimmerEffect
            containerStyles={"h-[45px] w-[150px] ml-[12px] mt-10 rounded-lg "}
          />
          <ShimmerEffect
            containerStyles={"h-[22%] w-[94%] ml-[12px] mt-3.5 rounded-2xl "}
          />
          <ShimmerEffect
            containerStyles={"h-[22%] w-[94%] ml-[12px] mt-2.5 rounded-2xl "}
          />
          <ShimmerEffect
            containerStyles={" h-[45px] w-[150px] ml-[12px] mt-3 rounded-lg "}
          />
          <ShimmerEffect
            containerStyles={"h-[22%] w-[94%] ml-[12px] mt-2.5 rounded-2xl "}
          />
        </>
      ) : (
        <ScrollView
          className="mx-3"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor="transparent"
              colors={["#FAFF00"]}
            />
          }
        >
          <View className="mt-10">
            <View>
              <Text className="text-Vivid font-PoppinsExtraBold text-xl">
                Last 30 Days
              </Text>
            </View>
            <InfoCard
              heading="Followers"
              data={followers}
              icon={icons.followers}
              containerStyles={"mt-3.5"}
            />
            <InfoCard
              heading="Interactions"
              data={interactions}
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
              {events.map((event, index) => (
                <EventCard
                  event={event}
                  user={{ username, dp, role }}
                  containerStyles="mt-2"
                />
              ))}
            </View>
          </View>
          {/* <TouchableOpacity
          onPress={addNewEvent}
          className="bg-Vivid p-3 rounded-md items-center mt-5 mb-5"
        >
          <Text className="text-white font-PoppinsBold text-lg">
            Add New Event
          </Text>
        </TouchableOpacity> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default dashboard;
