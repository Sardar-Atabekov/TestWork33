import { useCallback, useState } from 'react';
import { getCurrentWeather } from './../lib/api';
import { CurrentWeather } from '@shared/types/weather';
import { useWeatherStore } from '@shared/store/weatherStore';

export const useFetchWeather = (city: string) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setLastSearchedCity } = useWeatherStore();

  const fetchWeather = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getCurrentWeather(city);
      setWeather(data);
      setLastSearchedCity(data.name);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch weather';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [city, setLastSearchedCity]);

  return { weather, loading, error, fetchWeather };
};
