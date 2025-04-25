import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getCurrentWeather } from '@shared/api/api';
import { useWeatherStore } from '@shared/store/weatherStore';
import { CurrentWeather } from '@shared/types/weather';
import LoadingSpinner from '@shared/ui/LoadingSpinner';
import ErrorMessage from '@shared/ui/ErrorMessage';
import { WeatherCard } from '@entities/weatherCard';
import styles from '@shared/styles/Home.module.scss';

interface WeatherWidgetProps {
  defaultCity: string;
}

const WeatherWidget = ({ defaultCity }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { setLastSearchedCity } = useWeatherStore();

  const fetchWeather = useCallback(
    async (cityName: string) => {
      if (!cityName) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getCurrentWeather(cityName);
        setWeather(data);
        setLastSearchedCity(cityName);

        if (isClient && router.query.city !== cityName) {
          router.push(`/?city=${encodeURIComponent(cityName)}`, undefined, {
            shallow: true,
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
        setWeather(null);
      } finally {
        setLoading(false);
      }
    },
    [router, setLastSearchedCity, isClient]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !defaultCity) return;
    fetchWeather(defaultCity);
  }, [defaultCity, isClient, fetchWeather]);

  if (loading) {
    return (
      <div className={styles.weatherDisplay}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.weatherDisplay}>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (weather) {
    return (
      <div className={`${styles.weatherDisplay} ${styles.animatedEntry}`}>
        <WeatherCard weather={weather} showForecastLink={true} />
      </div>
    );
  }

  return (
    <div className={styles.weatherDisplay}>
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
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
        <h3>Search for a city to see the weather</h3>
        <p>
          Enter a city name in the search bar above to see the current weather
          conditions and forecast.
        </p>
      </div>

      <div className={styles.infoBox}>
        <h2>How to use this app</h2>
        <p>1. Enter a city name in the search bar above</p>
        <p>2. View current weather conditions for that city</p>
        <p>3. Click {'View 5-Day Forecast'} for detailed forecast</p>
        <p>
          4. Save your favorite cities to quickly access weather information
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;
