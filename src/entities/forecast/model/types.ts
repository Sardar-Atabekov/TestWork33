export interface ForecastItem {
  id: number;
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}
