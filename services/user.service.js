import { API_URL, verifyBaseUrl } from "@/constants";
import axios from "axios";
import { appropriateError } from "@/constants/functions";
export class UserService {
  constructor() {}

  static async getDashboard() {
    try {
      console.log("Sending Request: getDashboard");
      console.log(axios.defaults.headers.common["Authorization"]);
      const { data } = await axios.get(`${API_URL}/user/dashboard`);
      console.log("Request Successful: getDashboard");
      return data;
    } catch (e) {
      console.log(e.message);
      return e;
    }
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
}
