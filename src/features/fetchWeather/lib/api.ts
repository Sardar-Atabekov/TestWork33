import axios from 'axios';
import { CurrentWeather } from '@shared/types/weather';

export const getCurrentWeather = async (
  city: string
): Promise<CurrentWeather> => {
  const response = await axios.get(
    `/api/weather?city=${encodeURIComponent(city)}`
  );
  return response.data;
};
