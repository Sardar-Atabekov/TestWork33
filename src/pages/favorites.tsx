import React, { useState } from 'react';
import Link from 'next/link';
import ErrorMessage from '@shared/ui/ErrorMessage';
import { WeatherCard } from '@entities/weatherCard';
import { getCurrentWeather } from '@shared/api/api';
import LoadingSpinner from '@shared/ui/LoadingSpinner';
import { useWeatherStore } from '../shared/store/weatherStore';

export default function FavoritesPage() {
  const { favorites } = useWeatherStore();
  const [refreshing, setRefreshing] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

  // Refresh weather data for a specific city
  const refreshWeather = async (cityName: string, cityId: number) => {
    setRefreshing((prev) => ({ ...prev, [cityId]: true }));
    setErrors((prev) => ({ ...prev, [cityId]: '' }));

    try {
      const updatedWeather = await getCurrentWeather(cityName);

      // Update favorite with new data
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

  return (
    <div className="container">
      <div className="page-header">
        <h1>Your Favorite Cities</h1>
        <p>Quick access to weather in your saved locations</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <h3>No favorites yet</h3>
          <p>
            Search for cities on the home page and click the heart icon to add
            them to your favorites for quick access.
          </p>
          <Link href="/" className="btn btn-primary">
            Go to Home Page
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p>
              You have {favorites.length} favorite{' '}
              {favorites.length === 1 ? 'city' : 'cities'}
            </p>
          </div>

          <div className="row">
            {favorites.map((city) => (
              <div key={city.id} className="col-12 col-md-6 mb-4">
                {refreshing[city.id] ? (
                  <LoadingSpinner
                    message={`Refreshing ${city.name} weather...`}
                  />
                ) : (
                  <>
                    <WeatherCard weather={city} />

                    {errors[city.id] && (
                      <ErrorMessage message={errors[city.id]} />
                    )}

                    <div className="d-flex justify-content-center mt-3">
                      <button
                        className="btn btn-outline-primary me-2"
                        onClick={() => refreshWeather(city.name, city.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="me-1"
                        >
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                          <path d="M16 21h5v-5" />
                        </svg>
                        Refresh
                      </button>

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
      )}
    </div>
  );
}
