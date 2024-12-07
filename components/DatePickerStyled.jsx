import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { icons, images } from "../constants";

const DatePickerStyled = ({ value }) => {
  const [form, setForm] = useState({
    date: new Date(value),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, date: selectedDate });
    }
  };

  return (
    <View className={`space-y-2`}>
      <Text className="text-xl text-Text font-PoppinsLight">Date</Text>
      <View
        className="  w-full h-16 px-4 bg-MainLight
      rounded-3xl focus:border-secondary items-center flex-row"
      >
        <TextInput
          className="flex-1 text-white font-PoppinsRegular text-base "
          value={form.date.toLocaleDateString("en-GB")} // Format: DD.MM.YYYY
          editable={false} // Prevent manual typing
          placeholder="Select a date"
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MaterialIcons name="calendar-today" size={24} color="#7b7b8b" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePickerStyled;
