import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";

const ShimmerEffect = ({ containerStyles }) => {
  const [width, setWidth] = useState(0);
  const shimmerTranslateX = useSharedValue(-1); // Start shimmer from outside the view

  useEffect(() => {
    // Extract the width from containerStyles (assuming it's passed as a string like 'w-[96%]')
    const widthRegex = /w-\[(\d+)(px|%)\]/; // Regex to match 'w-[96%]'
    const widthMatch = containerStyles.match(widthRegex);

    if (widthMatch) {
      const widthPercentage = parseInt(widthMatch[1]);
      const calculatedWidth =
        widthMatch[2] === "px"
          ? widthPercentage // If in px, use it directly
          : (widthPercentage / 100) * 370; // For %, calculate based on 370px max width
      setWidth(calculatedWidth);
    }
  }, [containerStyles]);

  useEffect(() => {
    if (width > 0) {
      const animationDuration = Math.max((width / 300) * 1800); // Scale the duration based on width
      shimmerTranslateX.value = withRepeat(
        withTiming(1, { duration: animationDuration, loop: true }), // Dynamic duration based on width
        -1, // Infinite loop
        false
      );
    }
  }, [width]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: shimmerTranslateX.value * width, // Move across 300 units
      },
    ],
  }));

  return (
    <View className={`${containerStyles}  bg-gray-950 overflow-hidden`}>
      {/* Animated Linear Gradient */}
      <Animated.View style={[shimmerStyle, { flex: 1 }]}>
        <LinearGradient
          colors={["transparent", "rgba(92,63,211,0.4)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: "25%" }}
        />
      </Animated.View>
    </View>
  );
};

export default ShimmerEffect;
