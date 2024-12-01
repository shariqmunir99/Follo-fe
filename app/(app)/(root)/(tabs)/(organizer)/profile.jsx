import { Text, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "../../../../../services/user.service";
import { useQuery } from "@tanstack/react-query";
import ProfileRefreshing from "@/components/ProfileRefreshing";
import Profile from "@/components/Profile";

const ProfileScreen = () => {
  const { onLogout, authState } = useAuth();
  const role = authState.role;

  const {
    data: user,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: UserService.getProfile,
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

  const edit = () => {
    router.push("../edit-profile");
  };

  if (isLoading) {
    return <ProfileRefreshing isPreview={false} />;
  }

  if (isError) {
    return (
      <SafeAreaView>
        <Text>{error.message}</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="bg-Main h-full">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="#100425"
            colors={["#FAFF00"]}
          />
        }
      >
        {user && (
          <Profile
            user={user}
            role={role}
            isPreview={false}
            handlePress={edit}
            isFollowed={true}
            handleLogout={onLogout}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
