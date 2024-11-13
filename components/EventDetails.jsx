import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import heartIcon from '../assets/icons/filledheart.png';
import starIcon from '../assets/icons/filledstar.png';

const EventDetails = ({ key, dp, username, date, description, location, type, eventPic, picStyles, favorites, interests, showDeleteOption, containerStyles }) => {
  const screenHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView className={`bg-Main w-full ${containerStyles}`}>
      <View className="flex-col border-b-[1px] border-MainLight">
        <View className="flex-row items-center">
          <View className="flex-row items-center w-[50%] mt-3">
            <View>
              <Image
                source={dp}
                resizeMode='contain'
                className="w-12 h-12 rounded-full"
              />
            </View>
            <View className="flex-col ml-2">
              <View>
                <Text className="text-Text text-xs">@{username}</Text>
              </View>
              <View>
                <Text className="text-Vivid opacity-50 text-xs">{date}</Text>
              </View>
            </View>
          </View>

        </View>
        <View className="py-2">
          <Text className="text-Text opacity-90">{description}</Text>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-Text opacity-90">{location}</Text>
          </View>
          <View>
            <Text className="text-Text opacity-90">{type}</Text>
          </View>
        </View>
        <View className="py-2">
          <Image
            source={eventPic}
            className={`w-full rounded-xl`}
            style={{ height: screenHeight * 0.3 }}
          />
        </View>
        <View className="py-2 flex-row justify-between mb-2">
          <View className="bg-MainLight px-2 pt-2 pb-1 flex-row rounded-md items-center">
            <View>
              <Text className="text-Text font-PoppinsRegular">{interests}</Text>
            </View>
            <View className="pb-1 pl-2">
              <Image
                source={starIcon}
                className="w-3 h-3 "
                resizeMode='contain'
                style={{ tintColor: "#faff00" }}
              />
            </View>
          </View>
          <View className="bg-MainLight px-2 pt-2 pb-1 flex-row rounded-md items-center">
            <View>
              <Text className="text-Text font-PoppinsRegular">{favorites}</Text>
            </View>
            <View className="pb-1 pl-2">
              <Image
                source={heartIcon}
                className="w-3 h-3 "
                resizeMode='contain'
                style={{ tintColor: "#faff00" }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EventDetails