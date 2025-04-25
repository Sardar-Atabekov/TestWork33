import React from 'react';
import Image from 'next/image';
import styles from './ForecastCard.module.scss';
import { DetailItem } from '@entities/weatherCard';
import { ForecastItem } from '@shared/types/weather';
import { day, formattedDay, time } from '@shared/utils/date';
import getWeatherIconUrl from '@shared/lib/getWeatherIconUrl';

interface ForecastCardProps {
  forecast: ForecastItem;
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const date = new Date(forecast.dt * 1000);

  const iconUrl = getWeatherIconUrl(forecast.weather[0].icon);

  return (
    <div className={`card ${styles.forecastCard}`}>
      <div className="card-body">
        <h5 className="card-title">
          {day(date)}, {formattedDay(date)}
        </h5>
        <p className="text-muted">{time(date)}</p>
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
            <DetailItem label="humidity" value={`${forecast.main.humidity}%`} />
          </div>
          <div className="col-6">
            <DetailItem label="wind" value={`${forecast.wind.speed} м/с`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
