import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import EventDetails from "../../../../components/EventDetails";
import { icons, images } from "../../../../constants";

const myevents = () => {
  const [dp, setDp] = useState(images.johnwickdp);
  const [username, setUsername] = useState("john_wick");
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
    <SafeAreaView className="h-full bg-Main">
      <ScrollView className=" mt-2">
        {events.map((event, index) => (
          <EventDetails
            user={{
              dp: dp,
              username: username,
            }}
            event={event}
            containerStyles={"mt-10"}
            button={"delete"}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default myevents;

const styles = StyleSheet.create({});