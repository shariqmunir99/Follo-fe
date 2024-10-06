import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import eye from '../assets/icons/eye.png';
import eyeHide from '../assets/icons/eye-hide.png';


const InputField = ({title, value, placeHolder, handleChangeText, containerStyles, confirmPasswordProp}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <Text className="text-xl text-Text font-PoppinsLight">{title}</Text>
      <View className=" border-2 w-full h-16 px-4 bg-MainLight
      rounded-3xl focus:border-secondary items-center flex-row">
        <TextInput
            className="flex-1 text-white font-PoppinsRegular text-base "
            value={value}
            placeholder={placeHolder}
            placeholderTextColor ="#7b7b8b"
            onChangeText = {handleChangeText}
            secureTextEntry={(title === 'Password' || title === 'Confirm Password' || title === 'New Password') && !showPassword}
        />
        {(title === 'Password' || title === 'Confirm Password' || title === 'New Password') && (
            <TouchableOpacity onPress = {() => 
                setShowPassword(!showPassword)
            }>

                <Image 
                    source={!showPassword ? eye : eyeHide}
                    className="w-6 h-6 "
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default InputField
