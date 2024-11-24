import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import Dropdown from "@/components/DropDown";
import { icons, images } from "@/constants";
import EventDetails from "@/components/EventDetails";
import UserInfo from "@/components/UserInfo";

const discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("People");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleSearchPress = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    if (searchTerm) {
      console.log("Update:", searchTerm, selectedOption);
      // You can call your API or filter the data based on the searchTerm here.
    }
  }, [searchTerm, selectedOption]);

  const handleTouchOutside = () => {
    Keyboard.dismiss();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const generateUsers = () => {
    const users = [];

    for (let i = 0; i < 20; i++) {
      const user = {
        dp: images.johnwickdp,
        username: `john_wick`, // Making usernames unique
        followers: Math.floor(Math.random() * 1000), // Random followers between 0-999
        favourites: Math.floor(Math.random() * 500), // Random favourites between 0-499
        interests: Math.floor(Math.random() * 500), // Random interests between 0-499
      };
      users.push(user);
    }

    return users;
  };

  const users = generateUsers();

  const generateEvents = () => {
    const eventTypes = [
      "Concert",
      "Workshop",
      "Festival",
      "Conference",
      "Meetup",
    ];
    const locations = [
      "New York, USA",
      "London, UK",
      "Sydney, Australia",
      "Tokyo, Japan",
      "Berlin, Germany",
      "Paris, France",
      "Toronto, Canada",
      "Dubai, UAE",
      "Los Angeles, USA",
      "Mumbai, India",
    ];

    const descriptions = [
      "An exciting event for music lovers!",
      "A hands-on workshop to improve your skills.",
      "A grand festival with live performances.",
      "A conference featuring industry leaders.",
      "A casual meetup to network and share ideas.",
      "A night of thrilling entertainment and fun.",
      "An educational event to expand your knowledge.",
      "A networking event to connect with like-minded people.",
      "Join us for a unique experience of art and culture.",
      "An adventure-filled event for adrenaline junkies.",
    ];

    const events = [];

    for (let i = 0; i < 20; i++) {
      const event = {
        pic: images.eventPic,
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)], // Random description
        location: locations[Math.floor(Math.random() * locations.length)], // Random location
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)], // Random event type
        date: new Date(
          Date.now() + Math.floor(Math.random() * 10000000000) // Random future date
        ).toLocaleString(), // Converts the random date to a string
        favourites: Math.floor(Math.random() * 1000), // Random favourites between 0-1000
        interests: Math.floor(Math.random() * 1000), // Random interests between 0-1000
      };
      events.push(event);
    }

    return events;
  };
  const events = generateEvents();

  const user = {
    dp: images.johnwickdp, // Assuming icons.johnwickdp is imported correctly
    username: "john_wick",
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchOutside}>
      <SafeAreaView className="h-full w-full bg-Main">
        <View className="fixed">
          <SearchBar
            containerStyles={"mt-7 rounded-xl mx-3"}
            handleSearchPress={handleSearchPress}
          />
          <View className=" mt-4 mx-3 mb-1">
            <Dropdown
              options={["Events", "People"]}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
              mainContainerStyles={"absolute"}
              primaryStyles={"bg-MainLight rounded-md w-[80px]"}
              secondaryStyles={"bg-MainLight w-[80px]"}
              primaryTextStyles={"text-Vivid p-2"}
              secondaryTextStyles={"text-Text p-2"}
            />
          </View>
        </View>
        <ScrollView className="mt-[13%]" style={{ zIndex: -1 }}>
          {selectedOption === "People" && searchTerm && users.length > 0 && (
            <View>
              {users.map((u) => (
                <UserInfo
                  key={u.username}
                  user={u}
                  containerStyles={"mx-[3%] w-[94%] mt-2"}
                  showDetails={"yes"}
                />
              ))}
            </View>
          )}

          {/* {selectedOption === "People" &&
            searchTerm &&
            filteredUsers.length === 0 && <Text>No users found</Text>} */}

          {selectedOption === "Events" && searchTerm && users.length > 0 && (
            <View className="">
              {events.map((event) => (
                <EventDetails
                  key={event.date}
                  user={user}
                  event={event}
                  containerStyles={""}
                />
              ))}
            </View>
          )}

          {/* {selectedOption === "Events" &&
            searchTerm &&
            filteredEvents.length === 0 && <Text>No events found</Text>} */}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default discover;
