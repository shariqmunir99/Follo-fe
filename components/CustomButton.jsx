import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  isIcon,
  icon,
  iconOnly,
  iconStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-MainLight
      justify-center items-center flex-row ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
    >
      {!iconOnly && (
        <Text className={`text-Text text-lg font-PoppinsRegular ${textStyles}`}>
          {title}
        </Text>
      )}
      {isIcon && (
        <Image
          source={icon}
          className={`w-5 h-5 ${iconStyles}`}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
