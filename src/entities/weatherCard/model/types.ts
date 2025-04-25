import { CurrentWeather } from '@shared/types/weather';

export interface WeatherCardProps {
  weather: CurrentWeather;
  showForecastLink?: boolean;
}

export interface DetailItemProps {
  label: 'humidity' | 'wind' | 'pressure' | 'visibility';
  value: string;
}
