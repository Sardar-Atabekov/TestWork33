import React from 'react';
import Image from 'next/image';
import { CurrentWeather } from '@shared/types/weather';
import styles from './WeatherCard.module.scss';

interface WeatherMainInfo {
  weather: CurrentWeather;
}

export const WeatherMainInfo = ({ weather }: WeatherMainInfo) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className={styles.weatherMain}>
      <div className={styles.temperature}>
        <h1>{Math.round(weather.main.temp)}°C</h1>
        <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
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
