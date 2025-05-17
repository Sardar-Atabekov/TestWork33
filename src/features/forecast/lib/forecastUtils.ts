import { useMemo } from 'react';
import { ForecastItem } from '@shared/types/weather';

export const useForecastByDay = (forecastList: ForecastItem[]) => {
  return useMemo(() => {
    if (!forecastList?.length) return [];

    const groupedByDay: Record<string, ForecastItem[]> = {};

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0]; // YYYY-MM-DD

      if (!groupedByDay[day]) {
        groupedByDay[day] = [];
      }

      groupedByDay[day].push(item);
    });

    return Object.entries(groupedByDay).map(([day, items]) => ({
      day,
      items,
      avgTemp:
        items.reduce((sum, item) => sum + item.main.temp, 0) / items.length,
      minTemp: Math.min(...items.map((item) => item.main.temp_min)),
      maxTemp: Math.max(...items.map((item) => item.main.temp_max)),
      mainCondition:
        items.find((item) => {
          const hour = new Date(item.dt * 1000).getHours();
          return hour >= 11 && hour <= 13;
        })?.weather[0] || items[0].weather[0],
    }));
  }, [forecastList]);
};
