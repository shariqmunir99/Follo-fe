import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
} from "react-native";
import { icons } from "../constants";

const Dropdown = ({
  options,
  selectedOption,
  onOptionSelect,
  mainContainerStyles,
  primaryStyles,
  secondaryStyles,
  primaryTextStyles,
  secondaryTextStyles,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  const [dropdownHeight] = useState(new Animated.Value(0)); // Dropdown height animation

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState); // Toggle visibility
    if (dropdownVisible) {
      // Collapse the dropdown
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      // Expand the dropdown
      Animated.timing(dropdownHeight, {
        toValue: options.length * 40, // Height based on number of items
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  // Handle option select
  const handleOptionSelect = (option) => {
    onOptionSelect(option); // Pass the selected option to the parent component
    setDropdownVisible(false); // Close the dropdown
    Animated.timing(dropdownHeight, {
      toValue: 0, // Collapse the dropdown
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View className={`${mainContainerStyles}`}>
      {/* Button to toggle the dropdown */}

      <TouchableOpacity
        onPress={toggleDropdown}
        className={`flex-row items-center ${primaryStyles}`}
      >
        <Text className={`${primaryTextStyles} ml-2`}>{selectedOption}</Text>
        <Image
          source={icons.down}
          className={`w-3 h-3 mt-1`}
          resizeMode="contain"
          style={{ tintColor: "#FAFF00" }}
        />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Animated.View
        style={{
          height: dropdownHeight,
          overflow: "hidden",
          marginTop: 5,
        }}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleOptionSelect(option)}
            className={`${secondaryStyles}`}
          >
            <Text className={`${secondaryTextStyles} ml-2`}>{option}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

export default Dropdown;
