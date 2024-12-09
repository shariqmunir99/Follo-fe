import { API_URL, verifyBaseUrl } from "@/constants";
import axios from "axios";
import { appropriateError } from "@/constants/functions";
export class UserService {
  constructor() {}

  //TODO Follow
  static addFollow() {}
  //TODO Remove Follow
  //TODO Add InterestedBy
  //TODO Remove InterestedBy
  //TODO Get user profile -> organizer and user.
  static async getDashboard() {
    try {
      console.log("Sending Request: getDashboard");
      const result = await axios.get(`${API_URL}/user/dashboard`);
      console.log("Request Successful: getDashboard");
      return result.data;
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

  static async editProfile({ new_username, new_location, new_password }) {
    console.log("Sending Request: editProfile");
    const result = await axios.put(`${API_URL}/user/edit`, {
      new_username,
      new_location,
      new_password,
    });
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
