import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  handleTouchOutside,
} from "react-native";
import { icons } from "../constants";
import { TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const SearchBar = ({
  containerStyles,
  handleSearchPress,
  onKeyboardToggle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchPress = () => {
    Keyboard.dismiss();
    handleSearchPress(searchTerm); // Execute the passed function
    setSearchTerm(""); // Clear the input field
  };
  const handleFocus = () => {
    setIsFocused(true);
    onKeyboardToggle(true); // Call the keyboard toggle function
  };
  const handleBlur = () => {
    setIsFocused(false);
    onKeyboardToggle(false); // Call the keyboard toggle function
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchOutside}>
      <View className={` bg-Main  flex-row ${containerStyles}`}>
        <View
          className={`flex-row bg-MainLight rounded-xl ${isFocused ? "w-[84%]" : "w-[99%]"}`}
        >
          {!isFocused && (
            <View className="ml-3 -mr-2 items-center justify-center">
              <Image
                source={icons.search}
                className={`w-5 h-5`}
                resizeMode="contain"
                tintColor="white"
              />
            </View>
          )}
          <TextInput
            placeholder={"Search"}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCorrect={false}
            className="ml-2 p-2 h-12 text-Text w-[90%]"
            placeholderTextColor="grey"
          />
        </View>
        {isFocused && (
          <TouchableOpacity
            onPress={onSearchPress}
            className="ml-2 rounded-xl bg-MainLight w-[13%] justify-center items-center"
          >
            <Image
              source={icons.search}
              className={`w-5 h-5`}
              resizeMode="contain"
              tintColor="white"
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;
