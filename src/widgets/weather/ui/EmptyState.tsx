import React from 'react';
import styles from '@shared/styles/Home.module.scss';
import { Cloud } from 'lucide-react';
const EmptyState = () => (
  <div className={styles.weatherDisplay}>
    <div className="empty-state text-center">
      <Cloud size={64} />
      <h3>Search for a city to see the weather</h3>
      <p>
        Enter a city name in the search bar above to see the current weather
        conditions and forecast.
      </p>
    </div>

    <div className={styles.infoBox}>
      <h2>How to use this app</h2>
      <ul>
        <li>Enter a city name in the search bar above</li>
        <li>View current weather conditions for that city</li>
        <li>Click {'View 5-Day Forecast'} for detailed forecast</li>
        <li>Save your favorite cities to quickly access weather information</li>
      </ul>
    </div>
  </div>
);

export default React.memo(EmptyState);
