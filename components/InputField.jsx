import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { locations } from "../constants/data";

const InputField = ({
  title,
  value,
  placeHolder,
  handleChangeText,
  containerStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (text) => {
    handleChangeText(text);
    if (title.toLowerCase() === "account from") {
      if (text.trim() === "") {
        setFilteredLocations([]);
      } else {
        const matches = locations
          .filter((location) => {
            const [city, country] = location.split("/");
            return (
              city.toLowerCase().startsWith(text.toLowerCase()) ||
              (country && country.toLowerCase().startsWith(text.toLowerCase()))
            );
          })
          .slice(0, 5);
        setFilteredLocations(matches);
      }
    } else {
      setFilteredLocations([]);
    }
  };
  const handleLocationPress = (location) => {
    handleChangeText(location);
    setFilteredLocations([]);
    setIsFocused(false);
  };

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <Text className="text-xl text-Text font-PoppinsLight">{title}</Text>
      <View
        className="  w-full h-16 px-4 bg-MainLight
      rounded-3xl focus:border-secondary items-center flex-row"
      >
        <TextInput
          className="flex-1 text-white font-PoppinsRegular text-base "
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={
            (title === "Password" ||
              title === "Confirm Password" ||
              title === "New Password") &&
            !showPassword
          }
        />
        {(title === "Password" ||
          title === "Confirm Password" ||
          title === "New Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyehide}
              className="w-6 h-6 "
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {title.toLowerCase() === "account from" &&
        filteredLocations.length > 0 && (
          <ScrollView
            className="bg-MainLight mt-2 rounded-lg z-10"
            style={{
              position: "absolute",
              bottom: 70,
              left: 0,
              right: 0,
            }}
          >
            {filteredLocations.map((item, index) => (
              <TouchableOpacity
                key={`${item}-${index}`}
                onPress={() => handleLocationPress(item)}
                className={`bg-secondary px-4 py-2 my-1 rounded-md border-b-[1px] border-white} mb-0`}
              >
                <Text className="text-Vivid font-PoppinsRegular">{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
    </View>
  );
};

export default InputField;
