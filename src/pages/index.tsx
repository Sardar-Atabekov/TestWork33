import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SearchBar } from '@widgets/search-bar';
import { WeatherWidget } from '@widgets/weather';
import { useWeatherStore } from '@shared/store/weatherStore';
import styles from '@shared/styles/Home.module.scss';

export default function Home() {
  const { city } = useRouter().query;
  const { lastSearchedCity } = useWeatherStore();

  // Изначально используем lastSearchedCity, если city не задан в URL
  const [defaultCity, setDefaultCity] = useState<string>(
    typeof city === 'string' ? city : (lastSearchedCity ?? '')
  );

  useEffect(() => {
    if (typeof city === 'string' && city !== lastSearchedCity) {
      setDefaultCity(city); // Обновляем city, если оно приходит в URL
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  // Логирование значений для дебага

  return (
    <div className={styles.homeContainer}>
      <div className="page-header">
        <h1>Weather Forecast</h1>
        <p>Check current weather and forecasts for any city in the world</p>
      </div>

      <section className={styles.searchSection}>
        <SearchBar defaultValue={defaultCity} />
      </section>

      <WeatherWidget defaultCity={defaultCity} />
    </div>
  );
}
