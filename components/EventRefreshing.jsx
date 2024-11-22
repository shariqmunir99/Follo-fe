import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ShimmerEffect from "./ShimmerEffect";

const EventRefreshing = () => {
  return (
    <View className="flex-col mt-10 px-3 pb-3 border-b-[1px] border-MainLight">
      <View className="flex-row items-center">
        <ShimmerEffect containerStyles={"w-[55px] h-[55px] rounded-full"} />
        <ShimmerEffect
          containerStyles={"w-[110px] h-[35px] ml-[12px] rounded-lg"}
        />
      </View>
      <ShimmerEffect containerStyles={"w-[100%] h-[50px] rounded-lg mt-1.5"} />
      <View className="flex-row justify-between mt-1.5">
        <ShimmerEffect containerStyles={"w-[30%] h-[30px] rounded-lg"} />
        <ShimmerEffect containerStyles={"w-[30%] h-[30px] rounded-lg"} />
      </View>
      <ShimmerEffect containerStyles={"rounded-xl w-[100%] h-[200px] mt-1.5"} />
      <View className="flex-row justify-between mt-1.5">
        <ShimmerEffect containerStyles={"w-[25%] h-[45px] rounded-lg"} />
        <ShimmerEffect containerStyles={"w-[25%] h-[45px] rounded-lg"} />
      </View>
    </View>
  );
};

export default EventRefreshing;

const styles = StyleSheet.create({});
