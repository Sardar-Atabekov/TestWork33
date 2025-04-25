import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getForecast, getCurrentWeather } from '@shared/api/api';
import { groupForecastByDay } from './lib/forecastUtils';
import { CurrentWeather, WeatherForecast } from '@shared/types/weather';

interface ForecastState {
  forecast: WeatherForecast | null;
  currentWeather: CurrentWeather | null;
  loading: boolean;
  error: string | null;
}

export const useForecast = () => {
  const router = useRouter();
  const { city } = router.query;

  const [state, setState] = useState<ForecastState>({
    forecast: null,
    currentWeather: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (typeof city !== 'string') return;

    const fetchData = async () => {
      try {
        const [forecastData, weatherData] = await Promise.all([
          getForecast(city),
          getCurrentWeather(city),
        ]);

        setState({
          forecast: forecastData,
          currentWeather: weatherData,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'Failed to load',
          loading: false,
        }));
      }
    };

    fetchData();
  }, [city]);

  return {
    ...state,
    groupedForecast: state.forecast
      ? groupForecastByDay(state.forecast.list)
      : {},
  };
};
