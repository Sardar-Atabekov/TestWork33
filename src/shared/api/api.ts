import axios from 'axios';
import { CurrentWeather, WeatherForecast } from '../types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Creating axios instance with common configurations
const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric', // Temperature in Celsius
  },
});

// Add request interceptor for logging
weatherApi.interceptors.request.use((config) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('API Request:', {
      url: config.url,
      method: config.method,
      params: config.params,
    });
  }
  return config;
});

export const getCurrentWeather = async (
  city: string
): Promise<CurrentWeather> => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error(
          'City not found. Please check the spelling and try again.'
        );
      }
      throw new Error(
        `Error fetching weather data: ${error.response.data.message}`
      );
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};

export const getForecast = async (city: string): Promise<WeatherForecast> => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        throw new Error(
          'City not found. Please check the spelling and try again.'
        );
      }
      throw new Error(
        `Error fetching forecast data: ${error.response.data.message}`
      );
    }
    throw new Error('Failed to fetch forecast data. Please try again later.');
  }
};
