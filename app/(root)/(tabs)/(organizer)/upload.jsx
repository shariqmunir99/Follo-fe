import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField1 from "../../../../components/InputField1";  
import InputField from "../../../../components/InputField";  
import CustomButton from "../../../../components/CustomButton";
import { Link, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { icons, images } from "../../../../constants";
import DatePickerStyled from "../../../../components/DatePickerStyled";

const Spacer = ({ height }) => <View style={{ height }} />;
const Upload = () => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    venue: "",
    date: new Date(),
  });
  const [dp, setDp] = useState(images.eventPic);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setDp({ uri: result.assets[0].uri });
    }
  };

  const submit = async () => {
    // Submit the form data
    console.log("Uploaded An Event:", form);
    router.back();
  };
  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView>
        <View className="w-full h-[45%] items-center">
          <View className="mt-5 relative">
            <Image
              source={dp}
              resizeMode="contain"
              className="w-[150px] h-[150px] "
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 5,
              }}
              onPress={pickImage}
            >
              <MaterialIcons name="edit" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <Spacer height={20} />
          <View className="w-full justify-center mt-10">
            <View className="px-8">
              <InputField
                title="Name"
                placeHolder="Concert"
                value={form.name}
                handleChangeText={(e) => setForm({ ...form, name: e })}
                containerStyles={"mt-7"}
              />
              <InputField
                title="Type"
                placeHolder="Music Concert"
                value={form.type}
                handleChangeText={(e) => setForm({ ...form, type: e })}
                containerStyles={"mt-7"}
              />
              <InputField1
               title="Description"
               placeHolder="Nice view of the crowd"
               value={form.description}
               handleChangeText={(e) => setForm({ ...form, description: e })}
               containerStyles={"mt-7"}
              />
              <InputField
               title="Venue"
               placeHolder="New York,USA"
               value={form.venue}
               handleChangeText={(e) => setForm({ ...form,venue: e })}
               containerStyles={"mt-7"}
              />
               <Spacer height={20} />
               <DatePickerStyled
                value={form.date}
                onChange={(selectedDate) =>
                  setForm({ ...form, date: selectedDate })
                }
              />
              
              <Spacer height={20} />
              <CustomButton
                title="Update"
                containerStyles={
                  " w-[38%]  min-h-[50px] mx-auto rounded-2xl bg-Vivid"
                }
                textStyles={"text-Main"}
                handlePress={submit}
                isLoading={isSubmitting}
                isIcon={false}
                iconOnly={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Upload;


  
