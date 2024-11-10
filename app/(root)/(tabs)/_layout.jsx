import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect } from "expo-router";
import homeIcon from '../../../assets/icons/home.png';
import profile from '../../../assets/icons/profile.png';
import discover from '../../../assets/icons/search.png';
import interest from '../../../assets/icons/star.png';
import favorite from '../../../assets/icons/heart.png';
import { colors, fonts } from '../../../tailwind.config.js';

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className = "items-center justify-center gap-1.5">
            <Image 
                source ={icon}
                resizeMode ='contain'
                tintColor ={color}
                className="h-6 w-6"
            />
            <Text className ={`${focused ? "font-PoppinsSemiBold" : "font-PoppinsRegular"} text-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}
const TabsLayout = () => {
    return (
     <>
      <Tabs 
              screenOptions ={{
                  tabBarShowLabel : false,
                  tabBarActiveTintColor: '#FAFF00',
                  tabBarInactiveTintColor: '#CDCDE0',
                  tabBarStyle: {
                      backgroundColor: "#220A4B",
                      borderTopWidth: 1,
                      borderTopColor: '#232533',
                      height: 84,
                  }
              }}
      >
        <Tabs.Screen 
            name="homepage"
            options ={{
                title : "Home",
                headerShown : false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {homeIcon}
                        color = {color}
                        name ="Home"
                        focused = {focused}
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="discover"
            options ={{
                title : "Discover",
                headerShown : false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {discover}
                        color = {color}
                        name ="Discover"
                        focused = {focused}
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="favorites"
            options ={{
                title : "Favorites",
                headerShown : false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {favorite}
                        color = {color}
                        name ="Favorites"
                        focused = {focused}
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="interested"
            options ={{
                title : "Interested",
                headerShown : false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {interest}
                        color = {color}
                        name ="Interested"
                        focused = {focused}
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="profile"
            options ={{
                title : "Profile",
                headerShown : true,
                headerStyle: {
                    backgroundColor: colors.Main,
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: colors.Vivid,
                    fontFamily: fonts.PoppinsSemiBold ,
                },
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {profile}
                        color = {color}
                        name ="Me"
                        focused = {focused}
                    />
                )
            }}
        />
      </Tabs>
     </>
    )
  }
  
  export default TabsLayout
