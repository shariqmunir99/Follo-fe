import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ShimmerEffect from "./ShimmerEffect";
import { ScrollView } from "react-native";

const UserRefreshing = () => {
  return (
    <SafeAreaView className="bg-Main h-full w-full px-2.5">
      <ScrollView>
        <ShimmerEffect
          containerStyles={"w-[100%] h-[75px] rounded-3xl mt-1.5"}
        />
        <ShimmerEffect
          containerStyles={"w-[100%] h-[75px] rounded-3xl mt-1.5"}
        />
        <ShimmerEffect
          containerStyles={"w-[100%] h-[75px] rounded-3xl mt-1.5"}
        />
        <ShimmerEffect
          containerStyles={"w-[100%] h-[75px] rounded-3xl mt-1.5"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserRefreshing;

const styles = StyleSheet.create({});
