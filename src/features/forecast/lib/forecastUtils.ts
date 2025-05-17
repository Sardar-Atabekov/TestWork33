import { ForecastItem } from '@shared/types/weather';
import { useMemo } from 'react';

// Группировка прогноза по дням с сортировкой по времени
export function groupForecastByDay(
  forecastList: ForecastItem[]
): Record<string, ForecastItem[]> {
  const grouped: Record<string, ForecastItem[]> = {};

  for (const item of forecastList) {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(item);
  }

  // Сортировка дней и времени внутри дня
  return Object.fromEntries(
    Object.entries(grouped)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([day, items]) => [day, items.slice().sort((a, b) => a.dt - b.dt)])
  );
}

export function useGroupedForecast(forecastList: ForecastItem[] = []) {
  return useMemo(() => groupForecastByDay(forecastList), [forecastList]);
}
