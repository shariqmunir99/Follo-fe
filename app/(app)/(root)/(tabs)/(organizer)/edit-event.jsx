import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DatePickerStyled from "@/components/DatePickerStyled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventService } from "@/services/event.service";

const EditEvent = () => {
  const { id, name, type, description, city, country, venue, date, pic } =
    useLocalSearchParams();

  const [form, setForm] = useState({
    id: id,
    name: name,
    type: type,
    description: description,
    city: city,
    country: country,
    venue: venue,
    date: date ? new Date(date) : new Date(),
  });

  const [dp, setDp] = useState(pic);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const editeventMutation = useMutation({
    mutationFn: EventService.editEvent,
    onSuccess: () => {
      console.log("Event Successfully updated");
      queryClient.invalidateQueries(["event"]);
      router.back();
    },
    onError: (error) => {
      console.log("Inside onError");
      // console.log("ERROR:", error.response.data);
      queryClient.invalidateQueries(["event"]);
      setIsSubmitting(false);
      setTimeout(() => {
        router.back();
      }, 2000);
    },
  });

  useEffect(() => {
    setForm({
      id,
      name,
      type,
      description,
      city,
      country,
      venue,
      date: date ? new Date(date) : new Date(),
    });
    setDp(pic);
  }, [id, name, type, description, city, country, venue, date, pic]);

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
      setDp(result.assets[0].uri);
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    const payload = {
      ...form,
      image: image,
    };
    editeventMutation.mutate(payload);
  };

  // if (editeventMutation.isError) {
  //   console.log(editeventMutation.error);
  //   queryClient.invalidateQueries(["event"]);
  //   setTimeout(() => {
  //     router.back();
  //     // editeventMutation.isError = false;
  //   }, 2000);
  // }

  return (
    <SafeAreaView className=" bg-Main h-full">
      <ScrollView>
        <View className="w-full items-center">
          <View className="mt-5 relative">
            <Image
              source={{ uri: dp }}
              resizeMode="cover"
              className="w-96 h-64"
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

          <View className="w-full justify-center px-8">
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
              placeHolder="New York"
              value={form.city}
              handleChangeText={(e) => setForm({ ...form, city: e })}
              containerStyles={"mt-7"}
            />
            <InputField
              title="Venue"
              placeHolder="Fast"
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
              title="Update"
              containerStyles={
                " w-[38%]  min-h-[50px] my-7 mx-auto rounded-2xl bg-Vivid"
              }
              textStyles={"text-Main"}
              handlePress={submit}
              isLoading={isSubmitting}
              isIcon={false}
              iconOnly={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditEvent;
