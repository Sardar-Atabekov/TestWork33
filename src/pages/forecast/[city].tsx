import Link from 'next/link';
import { ForecastList } from '@widgets/forecast';
import ErrorMessage from '@shared/ui/ErrorMessage';
import { WeatherCard } from '@entities/weatherCard';
import LoadingSpinner from '@shared/ui/LoadingSpinner';
import { useForecast } from '@features/forecast/useForecast';
import { ChevronLeft } from 'lucide-react';

export default function ForecastPage() {
  const { currentWeather, groupedForecast, loading, error } = useForecast();

  if (loading) return <LoadingSpinner message="Loading forecast data..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!currentWeather)
    return <ErrorMessage message="No forecast data available" />;

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
          <ChevronLeft
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="me-1"
          />
          Back to Current Weather
        </Link>
      </div>

      <div className="mb-5">
        <WeatherCard weather={currentWeather} showForecastLink={false} />
      </div>

      <ForecastList forecast={groupedForecast} />
    </div>
  );
}
