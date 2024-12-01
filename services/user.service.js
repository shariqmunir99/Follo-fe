import { API_URL } from "@/constants";
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
  static async getProfile() {
    console.log("Sending Request: getProfile");
    const result = await axios.get(`${API_URL}/user/details`);
    console.log("Request Successful: getProfile");
    return result.data.result;
  }

  static async editProfile({ new_username, new_location, new_password }) {
    console.log("Sending Request: editProfile");
    try {
      console.log(new_username, new_location, new_password);
      const result = await axios.put(`${API_URL}/user/edit`, {
        new_username,
        new_location,
        new_password,
      });
      console.log("Request Successful: editProfile");
      return result;
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }
}
