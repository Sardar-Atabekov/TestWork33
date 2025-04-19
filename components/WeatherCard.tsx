import React from "react";
import Link from "next/link";
import { useWeatherStore } from "../store/weatherStore";
import { CurrentWeather } from "../types/weather";
import styles from "../styles/WeatherCard.module.scss";
import Image from "next/image";

interface WeatherCardProps {
  weather: CurrentWeather;
  showForecastLink?: boolean;
}

const WeatherCard = ({
  weather,
  showForecastLink = true,
}: WeatherCardProps) => {
  const { addFavorite, removeFavorite, favorites } = useWeatherStore();
  const isFavorite = favorites.some((fav) => fav.id === weather.id);

  // Format date
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(weather.id);
    } else {
      addFavorite(weather);
    }
  };

  return (
    <div className={`card ${styles.weatherCard}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="mb-0">
          {weather.name}, {weather.sys.country}
        </h2>
        <button
          className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"} ${styles.favoriteButton}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
      <div className="card-body">
        <p className="text-muted">{formattedDate}</p>
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

        <div className={styles.weatherDetails}>
          <div className="row mt-3">
            <div className="col-md-3 col-6">
              <div className={styles.detailItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2a2 2 0 0 0-2 2v12.4a4 4 0 1 0 8 0V4a2 2 0 0 0-2-2Z" />
                  <path d="M10 10V4" />
                </svg>
                <div>
                  <span className="text-muted">Humidity</span>
                  <p>{weather.main.humidity}%</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className={styles.detailItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                </svg>
                <div>
                  <span className="text-muted">Wind Test</span>
                  <p>{weather.wind.speed} m/s</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className={styles.detailItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m8 14-4 4H2v-2l4-4" />
                  <path d="M18.37 3.63 8 14l2 2L20.37 5.63a2.12 2.12 0 1 0-3-3Z" />
                </svg>
                <div>
                  <span className="text-muted">Pressure</span>
                  <p>{weather.main.pressure} hPa</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className={styles.detailItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                <div>
                  <span className="text-muted">Visibility</span>
                  <p>{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showForecastLink && (
          <div className="mt-4 d-flex justify-content-center">
            <Link
              href={`/forecast/${encodeURIComponent(weather.name)}`}
              className="btn btn-primary"
            >
              View 5-Day Forecast
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
