import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InfoCard from "../../../../components/InfoCard"; // Importing the test image
import EventCard from "../../../../components/EventCard";
import { icons, images } from "../../../../constants";
import { router } from "expo-router";

const dashboard = () => {
  const [followers, setFollowers] = useState("2.1K");
  const [interactions, setInteractions] = useState("11.3k");
  const dp = images.johnwickdp;
  const username = "john_wick";
  const role = "organizer";

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

  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView className="mx-3">
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default dashboard;
