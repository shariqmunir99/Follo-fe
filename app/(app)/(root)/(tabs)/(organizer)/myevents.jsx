import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback } from "react";
import { icons, images } from "@/constants";
import EventDetails from "@/components/EventDetails";

const myevents = () => {
  const [dp, setDp] = useState(images.johnwickdp);
  const [username, setUsername] = useState("john_wick");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate a network request or async operation (replace with actual logic)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // This simulates a 2-second refresh time
  }, []);

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
      <ScrollView
        className=" mt-7"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {events.map((event, index) => (
          <View key={event.id}>
            <EventDetails
              user={{
                dp: dp,
                username: username,
              }}
              event={event}
              containerStyles={""}
              button={"delete"}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default myevents;

const styles = StyleSheet.create({});
