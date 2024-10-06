import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
    return (
      <TouchableOpacity 
      onPress ={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className ={`bg-MainLight 
      min-h-[65px] justify-center items-center flex-row ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}>
        <Text 
        className={`text-Text text-lg font-PoppinsRegular ${textStyles}`}
        >{title}</Text>
        {/* {image && (
          <Image 
            source={image} 
            className="w-5 h-5 ml-2" 
            resizeMode="contain"
          />
        )} */}
      </TouchableOpacity>
    )
}

export default CustomButton