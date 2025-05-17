import { useCallback, useState, KeyboardEvent } from 'react';
import { Heart } from 'lucide-react';
import { useWeatherStore } from '@shared/store/weatherStore';
import { CurrentWeather } from '@shared/types/weather';
import styles from './favorite.module.scss';

interface FavoriteProps {
  weather: CurrentWeather;
}

const Favorite = ({ weather }: FavoriteProps) => {
  const { favorites, addFavorite, removeFavorite } = useWeatherStore();
  const [isFocused, setIsFocused] = useState(false);

  const isFavorite = favorites.some((item) => item.id === weather.id);

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(weather.id);
    } else {
      addFavorite(weather);
    }
  }, [isFavorite, weather, addFavorite, removeFavorite]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFavorite();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''} ${isFocused ? styles.focused : ''}`}
      aria-label={
        isFavorite
          ? `Remove ${weather.name} from favorites`
          : `Add ${weather.name} to favorites`
      }
      aria-pressed={isFavorite}
    >
      <Heart
        size={24}
        className={isFavorite ? styles.favoriteIcon : ''}
        aria-hidden="true"
      />
    </button>
  );
};

export default Favorite;
