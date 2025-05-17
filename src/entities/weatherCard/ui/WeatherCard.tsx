import React from 'react';
import Link from 'next/link';
import { Favorite } from '@features/favorite';
import { formattedDate } from '@shared/utils';
import styles from './WeatherCard.module.scss';
import { DetailItem } from './WeatherDetailItem';
import { WeatherCardProps } from '../model/types';
import { WeatherMainInfo } from './WeatherMainInfo';

const WeatherCard = React.memo(
  ({ weather, showForecastLink = true }: WeatherCardProps) => {
    return (
      <article
        className={`card ${styles.weatherCard}`}
        aria-label={`Weather information for ${weather.name}, ${weather.sys.country}`}
      >
        <header
          className="card-header d-flex justify-content-between align-items-center"
          style={{ backgroundColor: 'transparent' }}
        >
          <h2 className="mb-0 fw-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <Favorite weather={weather} />
        </header>
        <div className="card-body">
          <p className="text-muted" aria-live="polite">
            {formattedDate()}
          </p>
          <WeatherMainInfo weather={weather} />

          <div
            className={styles.weatherDetails}
            role="region"
            aria-label="Weather details"
          >
            <div className="row mt-3">
              <div className="col-md-3 col-6">
                <DetailItem
                  label="humidity"
                  value={`${weather.main.humidity}%`}
                />
              </div>
              <div className="col-md-3 col-6">
                <DetailItem label="wind" value={`${weather.wind.speed} m/s`} />
              </div>
              <div className="col-md-3 col-6">
                <DetailItem
                  label="pressure"
                  value={`${weather.main.pressure} hPa`}
                />
              </div>
              <div className="col-md-3 col-6">
                <DetailItem
                  label="visibility"
                  value={`${(weather.visibility / 1000).toFixed(1)} km`}
                />
              </div>
            </div>
          </div>
          {showForecastLink && (
            <div className="mt-4 d-flex justify-content-center">
              <Link
                href={`/forecast/${encodeURIComponent(weather.name)}`}
                className="btn btn-primary"
                aria-label={`View 5-day forecast for ${weather.name}`} // Описание для скринридеров
              >
                View 5-Day Forecast
              </Link>
            </div>
          )}
        </div>
      </article>
    );
  }
);

WeatherCard.displayName = 'WeatherCard';

export default WeatherCard;
