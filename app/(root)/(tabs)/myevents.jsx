import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import testpic from '../../../assets/pngs/event.jpg';
import EventDetails from '../../../components/EventDetails';
import DP from '../../../assets/pngs/dp.jpeg';

const myevents = () => {
  const [dp, setDp] = useState(DP);
  const [username, setUsername] = useState("john_wick")
  const events = [
    {
      id: 1,
      favorites: "1.5k",
      interests: "3.2k",
      date: "25/12/24",
      location: "Lahore, Pakistan",
      type: "Music Concert",
      description: "A thrilling live music concert featuring top local bands and artists.",
      pic: testpic,
    },
    {
      id: 2,
      favorites: "980",
      interests: "2.1k",
      date: "15/12/24",
      location: "Karachi, Pakistan",
      type: "Food Festival",
      description: "Enjoy delicious cuisines from around the world at the annual food festival.",
      pic: testpic,
    },
    {
      id: 3,
      favorites: "2.3k",
      interests: "4.5k",
      date: "14/12/24",
      location: "Islamabad, Pakistan",
      type: "Tech Conference",
      description: "A gathering of tech enthusiasts to discuss the latest innovations in technology.",
      pic: testpic,
    },
    {
      id: 4,
      favorites: "750",
      interests: "1.8k",
      date: "30/11/24",
      location: "Faisalabad, Pakistan",
      type: "Art Exhibition",
      description: "Explore the latest artwork from talented local and international artists.",
      pic: testpic,
    },
    {
      id: 5,
      favorites: "1.1k",
      interests: "2.9k",
      date: "20/06/23",
      location: "Multan, Pakistan",
      type: "Sports Event",
      description: "Watch an exciting cricket match between top national teams.",
      pic: testpic,
    },
  ]
  return (
    <SafeAreaView className="h-full bg-Main">
      <ScrollView className="mx-3 mb-10">
        {events.map((event, index) => (
          <EventDetails
            key={index}
            favorites={event.favorites}
            interests={event.interests}
            date={event.date}
            type={event.type}
            eventPic={event.pic}
            containerStyles="mt-2"
            showDeleteOption={true}
            description={event.description}
            dp={dp}
            username={username}
            location={event.location}
            picStyles={"h-[20%]"}

          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default myevents

const styles = StyleSheet.create({})