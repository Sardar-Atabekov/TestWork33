import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CurrentWeather } from '../types/weather';

interface WeatherState {
  favorites: CurrentWeather[];
  lastSearchedCity: string | null;
  addFavorite: (city: CurrentWeather) => void;
  removeFavorite: (cityId: number) => void;
  setLastSearchedCity: (city: string) => void;
}

// SSR-safe storage selection
const getStorage = () =>
  typeof window !== 'undefined'
    ? createJSONStorage(() => localStorage) // ✅ оборачиваем localStorage
    : createJSONStorage(() => ({
        getItem: async () => null,
        setItem: async () => {},
        removeItem: async () => {},
      }));

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      favorites: [],
      lastSearchedCity: null,
      addFavorite: (city) =>
        set((state) => ({
          favorites: [
            ...state.favorites.filter((item) => item.id !== city.id),
            city,
          ],
        })),
      removeFavorite: (cityId) =>
        set((state) => ({
          favorites: state.favorites.filter((city) => city.id !== cityId),
        })),
      setLastSearchedCity: (city) =>
        set(() => ({
          lastSearchedCity: city,
        })),
    }),
    {
      name: 'weather-storage',
      storage: getStorage(), // ✅ теперь типы совпадают
    }
  )
);
