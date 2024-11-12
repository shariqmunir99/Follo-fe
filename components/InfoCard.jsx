import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const InfoCard = ({ heading, data, containerStyles, icon }) => {
    return (
        <View className={`flex-col bg-MainLight px-4 py-2 rounded-2xl ${containerStyles}`}>
            <View className="flex-row items-center">
                <View>
                    <Image
                        source={icon}
                        className="w-7 h-7"
                        resizeMode='contain'
                        style={{ tintColor: "#ffff" }}
                    />
                </View>
                <View>
                    <Text className="text-Text font-PoppinsBold text-3xl pl-3 pt-1.5">{heading}</Text>
                </View>
            </View>
            <View className="flex-row justify-end items-center pt-10">
                <Text className="text-Vivid font-PoppinsBold text-5xl">+{data}</Text>
            </View>
        </View>
    )
}

export default InfoCard