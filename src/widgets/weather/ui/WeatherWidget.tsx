import React, { useEffect } from 'react';
import { useFetchWeather } from '@features/fetchWeather';
import { useCitySync } from '@features/useCity';
import LoadingSpinner from '@shared/ui/LoadingSpinner';
import ErrorMessage from '@shared/ui/ErrorMessage';
import { WeatherCard } from '@entities/weatherCard';
import EmptyState from './EmptyState';

interface WeatherWidgetProps {
  defaultCity: string;
}

const WeatherWidget = ({ defaultCity }: WeatherWidgetProps) => {
  const { weather, loading, error, fetchWeather } = useFetchWeather();

  useCitySync({ weather });

  useEffect(() => {
    if (defaultCity) {
      fetchWeather(defaultCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCity]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (weather) return <WeatherCard weather={weather} showForecastLink />;

  return <EmptyState />;
};

export default WeatherWidget;
