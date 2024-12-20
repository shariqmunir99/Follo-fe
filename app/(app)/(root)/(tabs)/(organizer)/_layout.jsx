import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { Tabs, usePathname, useRouter, router } from "expo-router";
import { icons, images } from "@/constants";
import { colors, fonts } from "@/tailwind.config.js";

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
          name="dashboard"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.dashboard}
                color={color}
                name="Dashboard"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: "Upload",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                name="Upload"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="myevents"
          options={{
            title: "My Events",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.myevents}
                color={color}
                name="MyEvents"
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
          name="event-detail"
          options={{
            title: "Event Detail",
            tabBarButton: () => null,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                name="Event Detail"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarButton: () => null,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                name="Analytics"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="edit-event"
          options={{
            title: "Edit Event",
            tabBarButton: () => null,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                name="Edit Event"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
