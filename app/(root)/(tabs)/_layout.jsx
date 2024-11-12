import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect } from "expo-router";
import profile from '../../../assets/icons/profile.png';
import myevents from '../../../assets/icons/myevents.png';
import upload from '../../../assets/icons/upload.png';
import dashboard from '../../../assets/icons/dashboard.png';
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
            name="dashboard"
            options ={{
                title : "Dashboard",
                headerShown : false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {dashboard}
                        color = {color}
                        name ="Dashboard"
                        focused = {focused}
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="upload"
            options ={{
                title : "Upload",
                headerShown : false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {upload}
                        color = {color}
                        name ="Upload"
                        focused = {focused}
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="myevents"
            options ={{
                title : "My Events",
                headerShown : false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon 
                        icon = {myevents}
                        color = {color}
                        name ="MyEvents"
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
