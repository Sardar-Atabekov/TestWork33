import { useRouter } from 'next/router';
import { SearchBar } from '@widgets/search-bar';
import { WeatherWidget } from '@widgets/weather';
import { useWeatherStore } from '@shared/store/weatherStore';
import styles from '@shared/styles/Home.module.scss';

export default function Home() {
  const { city } = useRouter().query;
  const { lastSearchedCity } = useWeatherStore();

  const defaultCity = typeof city === 'string' ? city : lastSearchedCity || '';

  return (
    <div className={styles.homeContainer}>
      <div className="page-header">
        <h1>Weather Forecast</h1>
        <p>Check current weather and forecasts for any city in the world</p>
      </div>

      <div className={styles.searchSection}>
        <SearchBar defaultValue={defaultCity} />
      </div>

      <WeatherWidget defaultCity={defaultCity} />
    </div>
  );
}
