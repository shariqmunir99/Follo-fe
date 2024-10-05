import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
 

const InputField = ({title, value, placeHolder, handleChangeText, containerStyles}) => {
  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <Text className="text-xl text-Text font-PoppinsLight">{title}</Text>
      <View className=" border-2 w-full h-16 px-4 bg-MainLight
      rounded-3xl focus:border-secondary items-center flex-row">
        <TextInput
            className="flex-1 text-white font-psemibold text-base "
            value={value}
            placeHolder={placeHolder}
            placeholderTextColor ="#7b7b8b"
            onChangeText = {handleChangeText}
            // secureTextEntry={title === 'Password' && !showPassword}
        />
      </View>
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({})