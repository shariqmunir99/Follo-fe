import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images, icons } from "../../../../constants";
import EventDetails from "../../../../components/EventDetails";

const home = () => {
  const user = {
    dp: images.johnwickdp,
    username: "john_wick",
  };
  const events = [
    {
      id: 1,
      favorites: "1.5k",
      interests: "3.2k",
      date: "25/12/24",
      location: "Lahore, Pakistan",
      type: "Music Concert",
      description:
        "A thrilling live music concert featuring top local bands and artists.",
      pic: images.eventPic,
    },
    {
      id: 2,
      favorites: "980",
      interests: "2.1k",
      date: "15/12/24",
      location: "Karachi, Pakistan",
      type: "Food Festival",
      description:
        "Enjoy delicious cuisines from around the world at the annual food festival.",
      pic: images.eventPic,
    },
    {
      id: 3,
      favorites: "2.3k",
      interests: "4.5k",
      date: "14/12/24",
      location: "Islamabad, Pakistan",
      type: "Tech Conference",
      description:
        "A gathering of tech enthusiasts to discuss the latest innovations in technology.",
      pic: images.eventPic,
    },
    {
      id: 4,
      favorites: "750",
      interests: "1.8k",
      date: "30/11/24",
      location: "Faisalabad, Pakistan",
      type: "Art Exhibition",
      description:
        "Explore the latest artwork from talented local and international artists.",
      pic: images.eventPic,
    },
    {
      id: 5,
      favorites: "1.1k",
      interests: "2.9k",
      date: "20/06/23",
      location: "Multan, Pakistan",
      type: "Sports Event",
      description:
        "Watch an exciting cricket match between top national teams.",
      pic: images.eventPic,
    },
  ];
  return (
    <SafeAreaView className=" w-full bg-Main">
      <ScrollView className="mt-7">
        {events.map((event, index) => (
          <EventDetails
            user={user}
            event={event}
            containerStyles={"mt-2"}
            button={"follow"}
          />
        ))}
      </ScrollView>
      {/* <View>
        <Text className="text-Main text-3xl">123</Text>
      </View> */}
    </SafeAreaView>
  );
};

export default home;
