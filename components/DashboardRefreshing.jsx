import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ShimmerEffect from "./ShimmerEffect";

const DashboardRefreshing = () => {
  return (
    <SafeAreaView className="w-full h-full bg-Main">
      <ScrollView>
        <View className="w-full px-2.5 mt-10">
          <ShimmerEffect containerStyles={"h-[45px] w-[150px] rounded-lg "} />
          <ShimmerEffect
            containerStyles={"h-[150px] w-[100%] mt-3.5 rounded-2xl "}
          />
          <ShimmerEffect
            containerStyles={"h-[150px] w-[100%] mt-2.5 rounded-2xl "}
          />
          <ShimmerEffect
            containerStyles={" h-[45px] w-[150px] mt-3 rounded-lg "}
          />
          <ShimmerEffect
            containerStyles={"h-[160px] w-[100%] mt-2.5 rounded-2xl "}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardRefreshing;

const styles = StyleSheet.create({});
