import React from 'react';
import { ForecastItem } from '@shared/types/weather';
import styles from './ForecastCard.module.scss';
import Image from 'next/image';

interface ForecastCardProps {
  forecast: ForecastItem;
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const date = new Date(forecast.dt * 1000);
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(
    date
  );
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);

  // Получаем время
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);

  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

  return (
    <div className={`card ${styles.forecastCard}`}>
      <div className="card-body">
        <h5 className="card-title">
          {day}, {formattedDate}время выполняется
        </h5>
        <p className="text-muted">{time}</p>
        <div className={styles.forecastMain}>
          <div className={styles.forecastTemp}>
            <h2>{Math.round(forecast.main.temp)}°C</h2>
          </div>
          <div className={styles.forecastIcon}>
            <Image
              src={iconUrl}
              alt={forecast.weather[0].description}
              width={50}
              height={50}
              unoptimized
              loading="lazy"
            />
            <p className="text-capitalize">{forecast.weather[0].description}</p>
          </div>
        </div>
        <div className={`row ${styles.forecastDetails}`}>
          <div className="col-6">
            <small className="text-muted">Влажность:</small>
            <p>{forecast.main.humidity}%</p>
          </div>
          <div className="col-6">
            <small className="text-muted">Ветер:</small>
            <p>{forecast.wind.speed} м/с</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
