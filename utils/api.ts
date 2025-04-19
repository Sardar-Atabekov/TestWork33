import axios from "axios";
import { CurrentWeather, WeatherForecast } from "../types/weather";

const API_KEY = "2233aa4417c8fb97936a73810225e2f8";

// const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || '';

const BASE_URL = "https://api.openweathermap.org/data/2.5";

console.log("API_KEY:", API_KEY); // Debugging line
// Creating axios instance with common configurations
const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric", // Temperature in Celsius
  },
});

export const getCurrentWeather = async (
  city: string,
): Promise<CurrentWeather> => {
  try {
    const response = await weatherApi.get("/weather", {
      params: { q: city },
    });
    console.log("Current Weather API_KEY:", API_KEY); // Debugging line
    console.log("Current Weather Response:", response.data); // Debugging line
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error(
          "City not found. Please check the spelling and try again.",
        );
      }
      throw new Error(
        `Error fetching weather data: ${error.response.data.message}`,
      );
    }
    throw new Error("Failed to fetch weather data. Please try again later.");
  }
};

export const getForecast = async (city: string): Promise<WeatherForecast> => {
  try {
    const response = await weatherApi.get("/forecast", {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error(
          "City not found. Please check the spelling and try again.",
        );
      }
      throw new Error(
        `Error fetching forecast data: ${error.response.data.message}`,
      );
    }
    throw new Error("Failed to fetch forecast data. Please try again later.");
  }
};
