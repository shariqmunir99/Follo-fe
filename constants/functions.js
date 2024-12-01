import { useState, useEffect, useCallback } from "react";
import { locations } from "./data";
import { codes, images } from "../constants";

export const useRefresh = (
  delay = 0,
  fetchFunction,
  params = [],
  trigger = true
) => {
  const [refreshing, setRefreshing] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    console.log("Fetching data...");
    try {
      setRefreshing(true);
      const result = await fetchFunction(...params); // Spread params dynamically
      //console.log("Fetched data:", result);
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "An error occurred");
    } finally {
      console.log("Setting refreshing to false...");
      setTimeout(() => {
        setRefreshing(false);
      }, delay);
    }
  }, [fetchFunction, ...params]);

  useEffect(() => {
    if (trigger) {
      console.log("Triggering loadData...");
      loadData(); // Fetch data on initial load
    }
  }, [trigger]);

  return { data, error, refreshing, onRefresh: loadData };
};

export const isValidLocation = (location) => {
  return locations.includes(location);
};

export const appropriateError = (error) => {
  if (error.status === codes.ALREADYEXISTS) {
    if (error.response.data.message.includes("email")) {
      return "User with this email already exists.";
    } else if (error.response.data.message.includes("username")) {
      return "User with this username already exists.";
    } else return error.response.data.message;
  } else if (error.status === codes.NOTFOUND) {
    return "User not found.";
  } else if (error.status === codes.UNAUTHORIZED) {
    return "Invalid email/password.";
  } else return "This is embarassing. We don't know what error is this T.T";
};

////Below are the fuctions used for front-end testing...

export const getSearchedData = (keyword) => {
  const events = [
    {
      id: 1,
      favorites: "1.5k",
      interests: "3.2k",
      date: "25/12/24",
      location: "Lahore, Pakistan",
      type: "Music Concert",
      description:
        "A thrilling live music concert featuring top local bands and artists.",
      pic: images.eventPic,
    },
    {
      id: 2,
      favorites: "980",
      interests: "2.1k",
      date: "15/12/24",
      location: "Karachi, Pakistan",
      type: "Food Festival",
      description:
        "Enjoy delicious cuisines from around the world at the annual food festival.",
      pic: images.eventPic,
    },
    {
      id: 3,
      favorites: "2.3k",
      interests: "4.5k",
      date: "14/12/24",
      location: "Islamabad, Pakistan",
      type: "Tech Conference",
      description:
        "A gathering of tech enthusiasts to discuss the latest innovations in technology.",
      pic: images.eventPic,
    },
    {
      id: 4,
      favorites: "750",
      interests: "1.8k",
      date: "30/11/24",
      location: "Faisalabad, Pakistan",
      type: "Art Exhibition",
      description:
        "Explore the latest artwork from talented local and international artists.",
      pic: images.eventPic,
    },
    {
      id: 5,
      favorites: "1.1k",
      interests: "2.9k",
      date: "20/06/23",
      location: "Multan, Pakistan",
      type: "Sports Event",
      description:
        "Watch an exciting cricket match between top national teams.",
      pic: images.eventPic,
    },
  ];

  const user = {
    username: "john_wick",
    dp: images.johnwickdp,
  };

  // Create userEvents list
  const searchedEvents = events.map((event) => ({
    user,
    event,
  }));

  // Create users list
  const people = Array.from({ length: 20 }, (_, index) => ({
    dp: images.johnwickdp,
    username: `john_wick_${index + 1}`, // Unique usernames
    followers: Math.floor(Math.random() * 1000), // Random followers between 0-999
    favorites: Math.floor(Math.random() * 500), // Random favourites between 0-499
    interests: Math.floor(Math.random() * 500), // Random interests between 0-499
  }));

  return { searchedEvents, people };
};
