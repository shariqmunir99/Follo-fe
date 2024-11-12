import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InfoCard from '../../../components/InfoCard';
import followersIcon from '../../../assets/icons/followers.png';
import interactionsIcon from '../../../assets/icons/interactions.png';
import testpic from '../../../assets/pngs/event.jpg'; // Importing the test image
import EventCard from '../../../components/EventCard';

const dashboard = () => {
  const [followers, setFollowers] = useState("2.1K");
  const [interactions, setInteractions] = useState("11.3k")

  // List of events (hardcoded)
  const events = [
    {
      favorites: 120,
      interested: 230,
      date: "Nov 15, 2024",
      type: "Music Concert",
      icon: testpic,
    },
    {
      favorites: 85,
      interested: 150,
      date: "Nov 20, 2024",
      type: "Art Exhibition",
      icon: testpic,
    },
    {
      favorites: 300,
      interested: 450,
      date: "Dec 1, 2024",
      type: "Tech Conference",
      icon: testpic,
    },
    {
      favorites: 200,
      interested: 320,
      date: "Dec 10, 2024",
      type: "Food Festival",
      icon: testpic,
    },
  ];


  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView className="mx-3">
        <View className="mt-5">
          <View>
            <Text className="text-Vivid font-PoppinsExtraBold text-xl">Last 30 Days</Text>
          </View>
          <InfoCard
            heading="Followers"
            data={followers}
            icon={followersIcon}
            containerStyles={"mt-3.5"}
          />
          <InfoCard
            heading="Interactions"
            data={interactions}
            icon={interactionsIcon}
            containerStyles={"mt-2.5"}
          />
        </View>
        <View className="mt-3.5">
          <View>
            <Text className="text-Vivid font-PoppinsExtraBold text-xl">Top Events</Text>
          </View>
          <View className="pb-10 mt-2">
            {events.map((event, index) => (
              <EventCard
                key={index}
                favorites={event.favorites}
                interested={event.interested}
                date={event.date}
                type={event.type}
                icon={event.icon}
                containerStyles="mt-2"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default dashboard
