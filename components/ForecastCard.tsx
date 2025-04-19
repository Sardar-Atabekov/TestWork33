import React from "react";
import { ForecastItem } from "../types/weather";
import styles from "../styles/ForecastCard.module.scss";

interface ForecastCardProps {
  forecast: ForecastItem;
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  // Format the date
  const date = new Date(forecast.dt * 1000);
  const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
    date,
  );
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);

  // Get time
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

  return (
    <div className={`card ${styles.forecastCard}`}>
      <div className="card-body">
        <h5 className="card-title">
          {day}, {formattedDate}
        </h5>
        <p className="text-muted">{time}</p>
        <div className={styles.forecastMain}>
          <div className={styles.forecastTemp}>
            <h2>{Math.round(forecast.main.temp)}°C</h2>
          </div>
          <div className={styles.forecastIcon}>
            <img
              src={iconUrl}
              alt={forecast.weather[0].description}
              width="50"
              height="50"
            />
            <p className="text-capitalize">{forecast.weather[0].description}</p>
          </div>
        </div>
        <div className={`row ${styles.forecastDetails}`}>
          <div className="col-6">
            <small className="text-muted">Humidity:</small>
            <p>{forecast.main.humidity}%</p>
          </div>
          <div className="col-6">
            <small className="text-muted">Wind:</small>
            <p>{forecast.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
