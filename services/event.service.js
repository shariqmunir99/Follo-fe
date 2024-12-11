import axios, { AxiosError } from "axios";
import { API_URL } from "@/constants";

export class EventService {
  static async upload({
    name,
    type,
    description,
    date,
    city,
    country,
    venue,
    image: file,
  }) {
    console.log("Sending request");
    console.log(description);

    const formData = new FormData();
    if (file) {
      console.log(file);
      formData.append("file", {
        uri: file.uri,
        name: file.fileName, // or dynamically use a picked file name
        type: file.mimeType, // ensure it matches the selected file's type
      });
    }
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("venue", venue);

    console.log("FORMDATA: ", formData);
    let result;
    try {
      result = await axios.post(`${API_URL}/event/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.log(e.message);
    }
    return "result.data.result";
  }

  static async getEvent(event_id) {
    try {
      console.log("Sending Request: getEvent", event_id);
      const result = await axios.get(`${API_URL}/event/details`, {
        params: { event_id: event_id },
      });
      console.log("Request Successful: getEvent");
      return result.data.result;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  }

  static async getAnalytics(id, buttonPressed) {
    try {
      let result;
      console.log("Sending Request: getAnalytics");
      const InterestedByResult = await axios.get(
        `${API_URL}/event/interested-by`,
        {
          params: { event_id: id },
        }
      );
      const FavoritedByResult = await axios.get(
        `${API_URL}/event/favorited-by`,
        {
          params: { event_id: id },
        }
      );
      console.log("Request Successful: getAnalytics");
      console.log({
        interestedBy: InterestedByResult.data,
        favoritedBy: FavoritedByResult.data,
      });
      return {
        interestedBy: InterestedByResult.data,
        favoritedBy: FavoritedByResult.data,
      };
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }

  static async editEvent({
    id,
    name,
    type,
    description,
    date,
    city,
    country,
    venue,
    image: file,
  }) {
    console.log("Sending Request: editEvent");

    const formData = new FormData();
    if (file) {
      formData.append("image", true);
      formData.append("file", {
        uri: file.uri,
        name: file.fileName, // or dynamically use a picked file name
        type: file.mimeType, // ensure it matches the selected file's type
      });
    }
    formData.append("event_id", id);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("venue", venue);

    const result = await axios.put(`${API_URL}/event/edit`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Request Successful: editEvent");
    return result;
  }

  static async deleteEvent(id) {
    try {
      console.log("Sending Request:");
      const result = axios.delete(`${API_URL}/event/delete`, {
        data: { event_id: id },
      });
      console.log("Request Successful:");
    } catch (e) {
      console.log(e);
    }
  }

  // }
}
