import { memo, useMemo } from 'react';
import { formattedDate } from '@shared/utils/date';
import { ForecastItem } from '@shared/types/weather';
import ForecastCard from '@entities/forecast/ui/ForecastCard';

const MemoizedForecastCard = memo(ForecastCard);

export const ForecastList = memo(
  ({ forecast }: { forecast: Record<string, ForecastItem[]> }) => {
    const forecastEntries = useMemo(() => Object.entries(forecast), [forecast]);

    if (!forecast || forecastEntries.length === 0) {
      return <div>No forecast data available</div>;
    }

    return (
      <>
        <h2 className="mb-4">5-Day Forecast</h2>
        {forecastEntries.map(([day, items]) => (
          <div key={day} className="mb-5">
            <h3>{formattedDate(new Date(day))}</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {items.map((item) => (
                <div className="col" key={item.dt}>
                  <MemoizedForecastCard forecast={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }
);

ForecastList.displayName = 'ForecastList';
