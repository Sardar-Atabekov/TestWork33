import { ForecastItem } from '@shared/types/weather';

// Group forecast data by day
const groupForecastByDay = (
  forecastList: ForecastItem[]
): Record<string, ForecastItem[]> => {
  const grouped: Record<string, ForecastItem[]> = {};

  forecastList.forEach((item) => {
    // Convert timestamp to local date string
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
  });

  // Sort the days chronologically
  const sortedDays = Object.keys(grouped).sort();
  const sortedGrouped: Record<string, ForecastItem[]> = {};

  sortedDays.forEach((day) => {
    // Sort items by time in 24-hour format
    sortedGrouped[day] = grouped[day].sort((a, b) => {
      const timeA = new Date(a.dt * 1000).getHours();
      const timeB = new Date(b.dt * 1000).getHours();
      return timeA - timeB;
    });
  });

  return sortedGrouped;
};

export { groupForecastByDay };
