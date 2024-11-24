import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'


const InfoField = ({ primary, secondary, containerStyles, textStyles, handlePress, icon, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
            className={`bg-MainLight
            items-center w-full h-[65px] flex-row rounded-2xl ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        >
            <View className="mx-4">
                <Image
                    source={icon}
                    className="w-7 h-7"
                    resizeMode='contain'
                    style={{ tintColor: "#FAFF00" }}
                />
            </View>
            <View className="flex-col ">
                <Text className={`text-Text font-bold ${textStyles}`}>{primary}</Text>
                {secondary && (
                    <Text className={`text-Text text-sm opacity-50`}>{secondary}</Text>
                )}

            </View>

        </TouchableOpacity>
    )
}

export default InfoField
