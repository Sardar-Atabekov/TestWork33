import { useState } from 'react';
import { refreshWeather } from '../lib/refreshWeather';
import { useWeatherStore } from '@shared/store/weatherStore';

export const useFavorites = () => {
  const { favorites } = useWeatherStore();
  const [refreshing, setRefreshing] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

  const handleRefresh = async (cityName: string, cityId: number) => {
    await refreshWeather(cityName, cityId, {
      setRefreshing,
      setErrors,
    });
  };

  return {
    favorites,
    refreshing,
    errors,
    refreshWeather: handleRefresh,
  };
};
