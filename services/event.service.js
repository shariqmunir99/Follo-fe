import axios from "axios";
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
}
