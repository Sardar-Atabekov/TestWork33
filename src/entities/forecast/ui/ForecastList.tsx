import { formattedDate } from '@shared/utils/date';
import { ForecastItem } from '@shared/types/weather';
import ForecastCard from '@entities/forecast/ui/ForecastCard';

export const ForecastList = ({
  forecast,
}: {
  forecast: Record<string, ForecastItem[]>;
}) => {
  return (
    <>
      <h2 className="mb-4">5-Day Forecast</h2>

      {Object.entries(forecast).map(([day, items]) => (
        <div key={day} className="mb-5">
          <h3>{formattedDate(new Date(day))}</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {items.map((item) => (
              <div key={item.dt} className="col">
                <ForecastCard forecast={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
