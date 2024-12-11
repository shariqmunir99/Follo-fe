import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import EventRefreshing from "@/components/EventRefreshing";
import EventDetails from "@/components/EventDetails";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";

const PaginatedList = ({ queryKey, queryFn }) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { authState } = useAuth();
  const role = authState.role;

  const {
    data,
    isError,
    isPending,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 5) {
        return null;
      }
      return lastPage.currentPage + 1;
    },
  });

  const onRefresh = async () => {
    setIsRefreshing(true);
    queryClient.removeQueries(queryKey); // Clear cached data to trigger loading
    await queryClient.invalidateQueries(queryKey); // Refetch the data
    setIsRefreshing(false);
  };

  if (isError) {
    console.log(error.response.data);
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-Main">
        <Text className="text-red-500 text-lg">{error.message}</Text>
      </SafeAreaView>
    );
  }

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return <EventRefreshing />;
    }
    return null;
  };

  const allItems = data?.pages.flatMap((page) => page.data) || [];

  const renderItem = ({ item: event }) => (
    <View key={event.id} className="mb-4">
      <EventDetails
        user={{
          dp: event.profilePic,
          username: event.organizer,
          organizer_id: event.organizer_id,
        }}
        event={{
          id: event.id,
          name: event.name,
          date: event.date,
          description: event.description,
          type: event.type,
          city: event.city,
          country: event.country,
          favourites: event.Interests,
          interests: event.Favorites,
          createdAt: format(new Date(event.createdAt), "do MMM, yyyy"),
          venue: event.venue,
          pic: event.imageUrl,
          isFollowing: event.isFollowing,
          isFavorited: event.isFavorited,
          isInterested: event.isInterested,
        }}
        containerStyles=""
        button={role === "Organizer" ? "delete" : "follow"}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-Main">
      {isPending && !isRefreshing ? (
        <>
          <EventRefreshing />
          <EventRefreshing />
        </>
      ) : (
        <FlatList
          data={allItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              progressBackgroundColor="#100425"
              colors={["#FAFF00"]}
            />
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          className="pt-7"
        />
      )}
    </SafeAreaView>
  );
};

export default PaginatedList;
