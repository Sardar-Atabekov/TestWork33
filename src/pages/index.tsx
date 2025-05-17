// pages/index.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { SearchBar } from '@widgets/search-bar';
import { WeatherWidget } from '@widgets/weather';
import styles from '@shared/styles/Home.module.scss';
import { useWeatherStore } from '@shared/store/weatherStore';
import { useRouter } from 'next/router';

interface HomeProps {
  initialCity: string;
}

export default function Home({ initialCity }: HomeProps) {
  const { lastSearchedCity } = useWeatherStore();
  const [defaultCity, setDefaultCity] = useState<string>('');
  const { city } = useRouter().query;

  useEffect(() => {
    let finalCity = '';

    if (typeof city === 'string') {
      finalCity = city;
    } else if (lastSearchedCity) {
      finalCity = lastSearchedCity;
    } else {
      finalCity = initialCity;
    }

    if (finalCity !== defaultCity) {
      setDefaultCity(finalCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, lastSearchedCity, initialCity]);

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

// SSR
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cityFromQuery = context.query.city;
  const initialCity = typeof cityFromQuery === 'string' ? cityFromQuery : '';

  return {
    props: {
      initialCity,
    },
  };
};
