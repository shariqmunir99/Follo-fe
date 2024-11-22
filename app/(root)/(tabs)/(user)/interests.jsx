import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images, icons } from "../../../../constants";
import EventDetails from "../../../../components/EventDetails";
import { useRefresh } from "../../../../constants/functions";
import EventRefreshing from "../../../../components/EventRefreshing";

const interests = () => {
  const [items, setItems] = useState([]);
  const getMyEventsData = () => {
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

    const user = {
      username: "john_wick",
      dp: images.johnwickdp,
    };

    // Create a list of objects with user and events together
    const userEvents = events.map((event, index) => ({
      user,
      event,
    }));

    return userEvents;
  };

  const { data, refreshing, onRefresh } = useRefresh(
    2000,
    getMyEventsData,
    [],
    true
  );
  useEffect(() => {
    if (data) {
      console.log("setting item now");
      setItems(data);
    }
  }, [data]);
  return (
    <SafeAreaView className=" w-full h-full bg-Main">
      {refreshing ? (
        <EventRefreshing />
      ) : (
        <ScrollView
          className="mt-7"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {items.map((item, index) => (
            <EventDetails
              user={item.user}
              event={item.event}
              containerStyles={""}
              button={"follow"}
              interactionButtonPressed={"yes"}
              interactionType={"interest"}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default interests;
