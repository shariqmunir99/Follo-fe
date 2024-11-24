import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../../../../components/SearchBar";
import Dropdown from "../../../../components/DropDown";
import { icons, images } from "../../../../constants";
import EventDetails from "../../../../components/EventDetails";
import UserInfo from "../../../../components/UserInfo";
import { useRefresh } from "../../../../constants/functions";
import EventRefreshing from "../../../../components/EventRefreshing";
import UserRefreshing from "../../../../components/UserRefreshing";
import { getSearchedData } from "../../../../constants/functions";

const discover = () => {
  const [searched, setSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("People");
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [people, setPeople] = useState([]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleKeyboardToggle = (flag) => {
    setIsKeyboardOpen(flag);
  };

  const handleSearchPress = (term) => {
    setSearched(true);
    setSearchTerm(term);
    //setFetchTrigger((prev) => !prev);
    console.log("Moiz ayy");
  };

  useEffect(() => {
    if (searchTerm) {
      console.log("Update:", searchTerm, selectedOption);
      // You can call your API or filter the data based on the searchTerm here.
    }
  }, [searchTerm, selectedOption]);

  const handleTouchOutside = () => {
    console.log("shariq ayy");
    Keyboard.dismiss();
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const onRefresh = () => {
    if (searched) {
      setRefreshing(true);
      const { searchedEvents, people } = getSearchedData(searchTerm);
      setEvents(searchedEvents);
      setPeople(people);
      setTimeout(() => {
        setRefreshing(false);
      }, 1500);
    } else {
      console.log("Eb=nter a keyword first");
    }
  };
  useEffect(() => {
    if (searchTerm) {
      if (searched) {
        onRefresh();
      }
    }
  }, [searchTerm]);

  return (
    <TouchableWithoutFeedback
      onPress={isKeyboardOpen ? handleTouchOutside : null}
    >
      <SafeAreaView className="h-full w-full bg-Main">
        <View className="fixed">
          <SearchBar
            containerStyles={"mt-7 rounded-xl mx-3"}
            handleSearchPress={handleSearchPress}
            onKeyboardToggle={handleKeyboardToggle}
          />
          <View className=" mt-4 mx-3 mb-1">
            <Dropdown
              options={["Events", "People"]}
              selectedOption={selectedOption}
              onOptionSelect={handleOptionSelect}
              mainContainerStyles={"absolute z-10"}
              primaryStyles={"bg-MainLight rounded-md w-[100px]"}
              secondaryStyles={"bg-MainLight w-[100px]"}
              primaryTextStyles={"text-Vivid p-2"}
              secondaryTextStyles={"text-Text p-2"}
            />
          </View>
        </View>
        {refreshing ? (
          selectedOption === "People" ? (
            <>
              <View className="h-[7%]" />
              <UserRefreshing />
            </>
          ) : (
            <>
              <View className="h-[2%]" />
              <EventRefreshing />
            </>
          )
        ) : (
          <ScrollView
            className="mt-[13%] "
            style={{ zIndex: -1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {selectedOption === "People" &&
              searchTerm &&
              people.length > 0 &&
              people.map((u, index) => (
                <UserInfo
                  key={index}
                  user={u}
                  containerStyles={"mx-[3%] w-[94%] mt-2"}
                  showDetails={"yes"}
                />
              ))}

            {selectedOption === "Events" &&
              searchTerm &&
              events.length > 0 &&
              events.map((item, index) => (
                <EventDetails
                  key={index}
                  user={item.user}
                  event={item.event}
                  containerStyles={""}
                />
              ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default discover;
