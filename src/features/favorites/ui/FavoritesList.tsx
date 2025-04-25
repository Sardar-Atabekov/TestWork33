import Link from 'next/link';
import { EmptyState } from './EmptyState';
import styles from './favorites.module.scss';
import { RefreshButton } from '@shared/ui/buttons';
import ErrorMessage from '@shared/ui/ErrorMessage';
import { WeatherCard } from '@entities/weatherCard';
import { useFavorites } from '../model/useFavorites';
import LoadingSpinner from '@shared/ui/LoadingSpinner';

export const FavoritesList = () => {
  const { favorites, refreshing, errors, refreshWeather } = useFavorites();

  if (favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className={`${styles.header} mb-4`}>
        <p>
          You have {favorites.length} favorite{' '}
          {favorites.length === 1 ? 'city' : 'cities'}
        </p>
      </div>

      <div className={`${styles.grid} row`}>
        {favorites.map((city) => (
          <div
            key={city.id}
            className={`${styles.cardWrapper} col-12 col-md-6 mb-4`}
          >
            {refreshing[city.id] ? (
              <LoadingSpinner message={`Refreshing ${city.name} weather...`} />
            ) : (
              <>
                <WeatherCard weather={city} />

                {errors[city.id] && <ErrorMessage message={errors[city.id]} />}

                <div className="d-flex justify-content-center mt-3">
                  <RefreshButton
                    onClick={() => refreshWeather(city.name, city.id)}
                  />

                  <Link
                    href={`/forecast/${encodeURIComponent(city.name)}`}
                    className="btn btn-primary"
                  >
                    View Forecast
                  </Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
