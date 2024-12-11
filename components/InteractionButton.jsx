import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../constants";
import { useAuth } from "@/context/AuthContext";

const InteractionButton = ({
  user,
  iconFor,
  value,
  onPress,
  iconStyles,
  eventId,
  alreadyPressed,
}) => {
  const { authState } = useAuth();
  const [isPressed, setIsPressed] = useState(alreadyPressed);
  const [role, setRole] = useState(authState.role);
  const verified = authState.verified;
  const userPressed = () => {
    setIsPressed(!isPressed);
    //update in database
  };

  // Sync isPressed state with alreadyPressed prop
  useEffect(() => {
    setIsPressed(alreadyPressed);
  }, [alreadyPressed]);
  // useEffect(() => {
  //   if (alreadyPressed === "yes") setIsPressed(true);
  // }, [alreadyPressed]);

  const getIcon = () => {
    if (role === "Organizer") {
      if (iconFor === "favorite") {
        return icons.filledheart;
      } else if (iconFor === "interest") {
        return icons.filledstar;
      }
    } else if (role === "User") {
      if (iconFor === "interest") {
        return isPressed ? icons.filledstar : icons.star;
      } else if (iconFor === "favorite") {
        return isPressed ? icons.filledheart : icons.heart;
      }
    }
    return null;
  };
  const iconSize = iconFor === "favorite" ? 13 : 12;
  return (
    <TouchableOpacity onPress={onPress} disabled={!verified}>
      <View className="bg-MainLight  h-[35px] flex-row rounded-md items-center p-2 box-border">
        {!isPressed && (
          <View className=" my-auto px-1">
            <Text className="text-Text font-PoppinsRegular">{value}</Text>
          </View>
        )}
        <View className={`${!isPressed ? "pl-1" : ""}`}>
          <Image
            source={getIcon()}
            className={`${isPressed ? "px-3" : ""}`}
            resizeMode="contain"
            style={{ width: iconSize, height: iconSize, tintColor: "#faff00" }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InteractionButton;
