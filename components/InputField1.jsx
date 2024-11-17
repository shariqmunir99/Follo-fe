import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useRef } from "react";
  
  const InputField1 = ({
    title,
    value,
    placeHolder,
    handleChangeText,
    containerStyles,
  }) => {
    const [inputHeight, setInputHeight] = useState(50); // Initial height (single line)
    const [showPassword, setShowPassword] = useState(false);
    const currentHeight = useRef(inputHeight); // Ref to track current height
    const expandCount = useRef(0); // Ref to track the number of expansions
  
    const handleContentSizeChange = (event) => {
      const newHeight = event.nativeEvent.contentSize.height + 20; // Add some padding
      if (
        newHeight > currentHeight.current &&
        expandCount.current < 3 // Allow only three expansions
      ) {
        currentHeight.current = newHeight;
        expandCount.current += 1;
        setInputHeight(newHeight);
      }
    };
  
    return (
      <View className={`space-y-2 ${containerStyles}`}>
        <Text className="text-xl text-Text font-PoppinsLight">{title}</Text>
        <View
          className="border-2 w-full px-4 bg-MainLight rounded-3xl focus:border-secondary items-center flex-row"
          style={{ paddingVertical: 5 }}
        >
          <TextInput
            className="flex-1 text-white font-PoppinsRegular text-base"
            value={value}
            placeholder={placeHolder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={
              (title === "Password" ||
                title === "Confirm Password" ||
                title === "New Password") &&
              !showPassword
            }
            multiline={title !== "Password" && title !== "Confirm Password"}
            onContentSizeChange={handleContentSizeChange} // Adjust height up to three times
            style={{
              height: Math.max(50, inputHeight), // Ensure minimum height
              textAlignVertical: "top", // Align text at the top for multi-line
            }}
          />
          {(title === "Password" ||
            title === "Confirm Password" ||
            title === "New Password") && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eye : icons.eyehide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  
  export default InputField1;
  