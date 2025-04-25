import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CurrentWeather } from '@shared/types/weather';

interface Props {
  weather: CurrentWeather | null;
}

export const useCitySync = ({ weather }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !weather) return;

    const cityName = weather.name;
    if (router.query.city !== cityName) {
      router.push(`/?city=${encodeURIComponent(cityName)}`, undefined, {
        shallow: true,
      });
    }
  }, [weather, isClient, router]);
};
