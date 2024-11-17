import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

const DatePickerStyled = () => {
  const [form, setForm] = useState({
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, date: selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={form.date.toLocaleDateString("en-GB")} // Format: DD.MM.YYYY
          editable={false} // Prevent manual typing
          placeholder="Select a date"
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MaterialIcons name="calendar-today" size={24} color="#bbb" />
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c034a", // Your desired dark purple background
    borderRadius: 8,
    padding: 12,
  },
  textInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
});

export default DatePickerStyled;
