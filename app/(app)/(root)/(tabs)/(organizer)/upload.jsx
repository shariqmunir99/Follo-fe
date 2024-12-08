import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField1 from "@/components/InputField1";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { icons, images } from "@/constants";
import DatePickerStyled from "@/components/DatePickerStyled";
import { useMutation } from "@tanstack/react-query";
import { EventService } from "../../../../../services/event.service";

const Spacer = ({ height }) => <View style={{ height }} />;
const Upload = () => {
  const [form, setForm] = useState({
    name: "asd",
    type: "asd",
    description: "asd",
    city: "asd",
    country: "Pakistan",
    venue: "asd",
    date: new Date().toISOString(),
  });
  const [dp, setDp] = useState(images.eventPic);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [image, setImage] = useState(null);

  const postMutation = useMutation({
    mutationFn: EventService.upload,

    onSuccess: () => {
      console.log("Uploaded Event");
      router.replace("/");
    },
  });

  if (postMutation.isError) {
    console.log(postMutation.error);
    return (
      <SafeAreaView>
        <Text>{postMutation.error.message}</Text>
      </SafeAreaView>
    );
  }

  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing animation
    try {
      setForm({
        name: "",
        type: "",
        description: "",
        city: "",
        country: "Pakistan",
        venue: "",
        date: new Date().toISOString(),
      });
    } finally {
      setRefreshing(false); // Stop the refreshing animation
    }
  };

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
      aspect: [16, 12],

      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setDp({ uri: result.assets[0].uri });
    }
  };

  const submit = async () => {
    // Submit the form data
    const payload = {
      ...form,
      image: image,
    };
    postMutation.mutate(payload);
  };

  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="#100425"
            colors={["#FAFF00"]}
          />
        }
      >
        <View className="w-full items-center">
          <View className="mt-5  ">
            <Image source={dp} resizeMode="cover" className="w-96 h-64" />
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

          <View className="w-full justify-center ">
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
              <InputField
                title="Description"
                placeHolder="Nice view of the crowd"
                value={form.description}
                handleChangeText={(e) => setForm({ ...form, description: e })}
                containerStyles={"mt-7"}
              />
              <InputField
                title="City"
                placeHolder="Lahore"
                value={form.city}
                handleChangeText={(e) => setForm({ ...form, city: e })}
                containerStyles={"mt-7"}
              />
              <InputField
                title="Venue"
                placeHolder="New York,USA"
                value={form.venue}
                handleChangeText={(e) => setForm({ ...form, venue: e })}
                containerStyles={"mt-7 mb-7"}
              />
              <DatePickerStyled
                value={form.date}
                onChange={(selectedDate) =>
                  setForm({ ...form, date: selectedDate.toISOString() })
                }
              />

              <CustomButton
                title="Upload"
                containerStyles={
                  " w-[38%]  min-h-[50px] my-7 mx-auto rounded-2xl bg-Vivid"
                }
                textStyles={"text-Main"}
                handlePress={submit}
                isIcon={false}
                iconOnly={false}
                isLoading={postMutation.isPending}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Upload;
