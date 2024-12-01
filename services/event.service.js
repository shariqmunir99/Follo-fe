import axios, { AxiosError } from "axios";
import { API_URL } from "@/constants";

export class EventService {
  static async upload({ name, type, description, city, date, venue, country }) {
    console.log("Sending request");
    console.log(name, type, description, city, date, venue, country);

    const result = await axios.post(`${API_URL}/event/upload`, {
      name,
      type,
      description,
      city,
      date,
      venue,
      country,
    });
    return result.data.result;
  }

  static async getEvent(event_id: string) {
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
      const InterestedByResult = await axios.get(`${API_URL}/event/interested-by`, {
          params: { event_id: id },
        });
      const FavoritedByResult = await axios.get(`${API_URL}/event/favorited-by`, {
          params: { event_id: id },
        });
      console.log("Request Successful: getAnalytics");
      return {interestedBy: InterestedByResult.data, favoritedBy: FavoritedByResult.data};
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }
}
