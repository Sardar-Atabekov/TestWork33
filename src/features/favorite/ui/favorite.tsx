import React from 'react';
import { Heart } from 'lucide-react';
import styles from './favorite.module.scss';
import { CurrentWeather } from '@shared/types/weather';
import { useWeatherStore } from '@shared/store/weatherStore';

const Favorite: React.FC<{ weather: CurrentWeather }> = ({ weather }) => {
  const favorites = useWeatherStore((state) => state.favorites);
  const addFavorite = useWeatherStore((state) => state.addFavorite);
  const removeFavorite = useWeatherStore((state) => state.removeFavorite);

  const isFavorite = favorites.some((fav) => fav.id === weather.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(weather.id);
    } else {
      addFavorite(weather);
    }
  };

  return (
    <button
      className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'} ${styles.favoriteButton}`}
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </button>
  );
};

export default Favorite;
