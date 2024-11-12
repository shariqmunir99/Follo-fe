import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import heartIcon from '../assets/icons/filledheart.png';
import starIcon from '../assets/icons/filledstar.png';

const EventCard = ({ favorites, interested, type, date, containerStyles, icon }) => {
  return (
    <View className={`flex-row bg-MainLight px-4 py-2 rounded-2xl ${containerStyles}`}>
      <View className="w-[50%]">
        <Image
          source={icon}
          className="w-[145px] h-[145px] rounded-md"
          resizeMode='contain'
        />
      </View>
      <View className="flex-col py-1">
        <View className="flex-row items-baseline">
          <View>
            <Image
              source={heartIcon}
              className="w-4 h-4 "
              resizeMode='contain'
              style={{ tintColor: "#faff00" }}
            />
          </View>
          <View className="ml-2.5">
            <Text className="text-Text text-2xl font-PoppinsBold">{favorites}</Text>
          </View>
        </View>
        <View className="flex-row items-baseline mt-1">
          <View>
            <Image
              source={starIcon}
              className="w-4 h-4 "
              resizeMode='contain'
              style={{ tintColor: "#faff00" }}
            />
          </View>
          <View className="ml-2.5">
            <Text className="text-Text text-2xl font-PoppinsBold">{interested}</Text>
          </View>
        </View>
        <Text className="mt-1 text-Text text-xl font-PoppinsSemiBold">{date}</Text>
        <Text className="mt-1 text-Text text-xl font-PoppinsSemiBold">{type}</Text>
      </View>
    </View>
  )
}

export default EventCard;