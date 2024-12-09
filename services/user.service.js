import { API_URL, verifyBaseUrl } from "@/constants";
import axios from "axios";
import { appropriateError } from "@/constants/functions";
import App from "@/app/(app)";
export class UserService {
  constructor() {}

  static async getDashboard() {
    try {
      console.log("Sending Request: getDashboard");
      const { data } = await axios.get(`${API_URL}/user/dashboard`);
      console.log("Request Successful: getDashboard");
      return data;
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }

  static async getHomepage(pageParam) {
    console.log("Sending Request: getHomepage");
    const result = await axios.get(`${API_URL}/user/home?page=${pageParam}`);
    console.log("Request Successful: getHomepage");
    return result.data;
  }

  static async getMyEventsPaginated(pageParam) {
    console.log("Sending Request: getMyEventsPaginated");
    const result = await axios.get(
      `${API_URL}/user/my-events?page=${pageParam}`
    );
    console.log("Request Successful: getMyEventsPaginated");
    return result.data;
  }

  static async getInterestedEventsPaginated(pageParam) {
    console.log("Sending Request: getInterestedEventsPaginated");
    const result = await axios.get(
      `${API_URL}/user/interested-events?page=${pageParam}`
    );
    console.log("Request Successful: getInterestedEventsPaginated");
    console.log(result.data);
    return result.data;
  }

  static async getFavoritedEventsPaginated(pageParam) {
    console.log("Sending Request: getFavoritedEventsPaginated");
    const result = await axios.get(
      `${API_URL}/user/favorited-events?page=${pageParam}`
    );
    console.log("Request Successful: getFavoritedEventsPaginated");
    return result.data;
  }

  static async getProfile() {
    console.log("Sending Request: getProfile");
    const result = await axios.get(`${API_URL}/user/details`);
    console.log("Request Successful: getProfile");
    return result.data.result;
  }

  static async editProfile({
    new_username,
    new_location,
    new_password,
    new_profPic: file,
  }) {
    console.log("Sending Request: editProfile");

    const formData = new FormData();
    if (file) {
      console.log(file);
      formData.append("new_profile_pic", true);
      formData.append("file", {
        uri: file.uri,
        name: file.fileName, // or dynamically use a picked file name
        type: file.mimeType, // ensure it matches the selected file's type
      });
    }
    formData.append("new_username", new_username);
    formData.append("new_location", new_location);
    if (new_password) {
      formData.append("new_password", new_password);
    }
    let result;
    try {
      result = await axios.put(`${API_URL}/user/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.log * ("ERRPRPRPR: ", e);
    }
    console.log("Request Successful: editProfile");
    return result;
  }

  static async verify() {
    console.log("Sending Request: Verify");
    const result = await axios.post(`${API_URL}/user/verify`, {
      baseUrl: verifyBaseUrl,
    });
    console.log("Request Successful: Verify");
    return result.data;
  }

  static async addFollow(organizer_id) {
    console.log("Sending Request: addFollow");
    const result = await axios.post(`${API_URL}/user/follow`, {
      organizer_id,
    });

    console.log("Request Successful: addFollow");
    return result.data;
  }

  static async addInterest(event_id) {
    console.log("Sending Request: addInterest");
    const result = await axios.post(`${API_URL}/event/interested-by`, {
      event_id,
    });

    console.log("Request Successful: addInterest");
    return result.data;
  }

  static async addFavorite(event_id) {
    console.log("Sending Request: addFavorite");
    const result = await axios.post(`${API_URL}/event/favorited-by`, {
      event_id,
    });

    console.log("Request Successful: addFavorite");
    return result.data;
  }
}
