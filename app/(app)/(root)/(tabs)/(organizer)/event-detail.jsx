import {
  SafeAreaView,
  ScrollView,
  Text,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import EventDetails from "@/components/EventDetails";
import EventRefreshing from "@/components/EventRefreshing";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { images } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { EventService } from "../../../../../services/event.service";
import { format } from "date-fns";

const eventdetail = () => {
  const { id } = useLocalSearchParams();
  // const id = "4835d882-a9bd-4f8a-b841-fb080880d538";
  // const event_id = "4835d882-a9bd-4f8a-b841-fb080880d538";
  const [item, setItem] = useState(null);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["event", id],
    queryFn: () => {
      return EventService.getEvent(id);
    },
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing animation
    try {
      await refetch(); // Refetch the data from the backend
    } finally {
      setRefreshing(false); // Stop the refreshing animation
    }
  };

  return (
    <SafeAreaView className="h-full w-full bg-Main">
      <Stack.Screen />

      {isLoading ? (
        <EventRefreshing />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor="transparent"
              colors={["#FAFF00"]}
            />
          }
        >
          {data && (
            <EventDetails
              user={{
                dp: images.johnwickdp,
                username: data.organizer,
              }}
              event={{
                id: data.id,
                date: format(new Date(data.date), "do MMM, yyyy"),
                description: data.description,
                type: data.type,
                city: data.city,
                country: data.country,
                favourites: data.interests,
                interests: data.favourites,
                createdAt: format(new Date(data.createdAt), "do MMM, yyyy"),
                venue: data.venue,
                pic: images.eventPic,
              }}
              containerStyles={"mt-10"}
              button={"delete"}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default eventdetail;
