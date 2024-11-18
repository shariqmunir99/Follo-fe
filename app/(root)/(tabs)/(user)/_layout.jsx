import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, Redirect } from "expo-router";
import { icons, images } from "../../../../constants";
import { colors, fonts } from "../../../../tailwind.config.js";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1.5">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="h-6 w-6"
      />
      <Text
        className={`${focused ? "font-PoppinsSemiBold" : "font-PoppinsRegular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FAFF00",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#220A4B",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",

            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: "Discover",

            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.search}
                color={color}
                name="Discover"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",

            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.heart}
                color={color}
                name="Favorites"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="interests"
          options={{
            title: "Interests",

            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.star}
                color={color}
                name="Interests"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.Main,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: colors.Text,
              fontFamily: fonts.PoppinsRegular,
            },
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Me"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile-preview"
          options={{
            title: "Profile preview",
            tabBarButton: () => null,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="Profile preview" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
