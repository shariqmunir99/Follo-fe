import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import InfoCard from "@/components/InfoCard";
import EventCard from "@/components/EventCard";
import DashboardRefreshing from "@/components/DashboardRefreshing";
import { icons, images } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../../../../../services/user.service";

const dashboard = () => {
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: UserService.getDashboard,
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing animation
    try {
      await refetch(); // Refetch the data from the backend
    } finally {
      setRefreshing(false); // Stop the refreshing animation
    }
  };

  return (
    <SafeAreaView className=" bg-Main h-full">
      {isLoading ? (
        <DashboardRefreshing />
      ) : (
        <ScrollView
          className="mx-3"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor="#100425"
              colors={["#FAFF00"]}
            />
          }
        >
          <View className="mt-10">
            <View>
              <Text className="text-Vivid font-PoppinsExtraBold text-xl">
                Last 30 Days
              </Text>
            </View>
            <InfoCard
              heading="Followers"
              data={data.Followers}
              icon={icons.followers}
              containerStyles={"mt-3.5"}
            />
            <InfoCard
              heading="Interactions"
              data={data.Interactions}
              icon={icons.interactions}
              containerStyles={"mt-2.5"}
            />
          </View>
          <View className="mt-3.5">
            <View>
              <Text className="text-Vivid font-PoppinsExtraBold text-xl">
                Top Events
              </Text>
            </View>
            <View className="pb-10 mt-2">
              {data.Events.map((event, index) => (
                <View key={event.id}>
                  <EventCard event={event} containerStyles="mt-2" />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default dashboard;
