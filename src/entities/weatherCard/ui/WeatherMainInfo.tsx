import React, { useMemo } from 'react';
import Image from 'next/image';
import { CurrentWeather } from '@shared/types/weather';
import styles from './WeatherCard.module.scss';
import getWeatherIconUrl from '@shared/lib/getWeatherIconUrl';

interface WeatherMainInfo {
  weather: CurrentWeather;
}

export const WeatherMainInfo = ({ weather }: WeatherMainInfo) => {
  const { roundedTemp, roundedFeelsLike } = useMemo(() => {
    return {
      roundedTemp: Math.round(weather.main.temp),
      roundedFeelsLike: Math.round(weather.main.feels_like),
    };
  }, [weather.main.temp, weather.main.feels_like]);

  const iconUrl = useMemo(() => {
    return getWeatherIconUrl(weather.weather[0].icon);
  }, [weather.weather]);

  return (
    <div className={styles.weatherMain}>
      <div className={styles.temperature}>
        <h1>{roundedTemp}°C</h1>
        <p>Feels like: {roundedFeelsLike}°C</p>
      </div>
      <div className={styles.weatherIcon}>
        <Image
          src={iconUrl}
          alt={weather.weather[0].description}
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
        <p className="text-capitalize">{weather.weather[0].description}</p>
      </div>
    </div>
  );
};
