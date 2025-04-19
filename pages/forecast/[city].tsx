import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getForecast, getCurrentWeather } from "../../utils/api";
import {
  ForecastItem,
  WeatherForecast,
  CurrentWeather,
} from "../../types/weather";
import ForecastCard from "../../components/ForecastCard";
import WeatherCard from "../../components/WeatherCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
// import styles from "../../styles/Home.module.scss";

export default function ForecastPage() {
  const router = useRouter();
  const { city } = router.query;

  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof city === "string") {
      fetchData(city);
    }
  }, [city]);

  const fetchData = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both current weather and forecast data
      const [forecastData, weatherData] = await Promise.all([
        getForecast(cityName),
        getCurrentWeather(cityName),
      ]);

      setForecast(forecastData);
      setCurrentWeather(weatherData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  // Group forecast data by day
  const groupForecastByDay = (forecastList: ForecastItem[]) => {
    const grouped: Record<string, ForecastItem[]> = {};

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split("T")[0];

      if (!grouped[day]) {
        grouped[day] = [];
      }

      grouped[day].push(item);
    });

    return grouped;
  };

  if (loading) return <LoadingSpinner message="Loading forecast data..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!forecast || !currentWeather)
    return <ErrorMessage message="No forecast data available" />;

  const groupedForecast = groupForecastByDay(forecast.list);

  return (
    <div className="container">
      <div className="page-header">
        <h1>5-Day Weather Forecast</h1>
        <p>
          {currentWeather.name}, {currentWeather.sys.country}
        </p>
      </div>

      <div className="mb-4">
        <Link
          href={`/?city=${encodeURIComponent(currentWeather.name)}`}
          className="btn btn-outline-primary"
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Current Weather
        </Link>
      </div>

      <div className="mb-5">
        <WeatherCard weather={currentWeather} showForecastLink={false} />
      </div>

      <h2 className="mb-4">5-Day Forecast</h2>

      {Object.entries(groupedForecast).map(([day, items]) => (
        <div key={day} className="mb-5">
          <h3 className="mb-3">
            {new Date(day).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {items.map((item, index) => (
              <div key={index} className="col">
                <ForecastCard forecast={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
