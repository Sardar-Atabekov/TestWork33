import { getCurrentWeather } from '@shared/api/api';
import { useWeatherStore } from '@shared/store/weatherStore';

type RefreshOptions = {
  setRefreshing: (
    value: (prev: Record<number, boolean>) => Record<number, boolean>
  ) => void;
  setErrors: (
    value: (prev: Record<number, string>) => Record<number, string>
  ) => void;
};

export const refreshWeather = async (
  cityName: string,
  cityId: number,
  { setRefreshing, setErrors }: RefreshOptions
) => {
  setRefreshing((prev) => ({ ...prev, [cityId]: true }));
  setErrors((prev) => ({ ...prev, [cityId]: '' }));

  try {
    const updatedWeather = await getCurrentWeather(cityName);
    useWeatherStore.getState().addFavorite(updatedWeather);
  } catch (err) {
    setErrors((prev) => ({
      ...prev,
      [cityId]: err instanceof Error ? err.message : 'Failed to refresh',
    }));
  } finally {
    setRefreshing((prev) => ({ ...prev, [cityId]: false }));
  }
};
