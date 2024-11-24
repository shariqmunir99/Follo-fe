import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ShimmerEffect from "./ShimmerEffect";
import EventRefreshing from "./EventRefreshing";

const ProfileRefreshing = ({ isPreview }) => {
  return (
    <SafeAreaView className="w-full h-full bg-Main">
      <ScrollView>
        <View className="w-full flex-col items-center mt-12">
          <ShimmerEffect containerStyles={"w-[150px] h-[150px] rounded-full"} />
          <ShimmerEffect
            containerStyles={"w-[150px] h-[30px] rounded-lg mt-2"}
          />
          <ShimmerEffect
            containerStyles={"w-[220px] h-[40px] rounded-lg mt-2"}
          />
          <ShimmerEffect
            containerStyles={"w-[150px] h-[50px] rounded-xl mt-2"}
          />
        </View>
        {!isPreview ? (
          <View className="w-full px-3 mt-6">
            <ShimmerEffect containerStyles={"w-[100%] h-[70px] rounded-xl"} />
            <ShimmerEffect
              containerStyles={"w-[100%] h-[70px] rounded-xl mt-2"}
            />
            <ShimmerEffect
              containerStyles={"w-[100%] h-[70px] rounded-xl mt-2"}
            />
            <ShimmerEffect
              containerStyles={"w-[100%] h-[55px] rounded-2xl mt-6"}
            />
          </View>
        ) : (
          <EventRefreshing />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileRefreshing;

const styles = StyleSheet.create({});
