import React from 'react';
import { Droplets, Wind, Gauge, Eye, LucideIcon } from 'lucide-react';
import styles from './WeatherCard.module.scss';
import { DetailItemProps } from '../model/types';

// Карта иконок
const weatherIcons: Record<DetailItemProps['label'], LucideIcon> = {
  humidity: Droplets,
  wind: Wind,
  pressure: Gauge,
  visibility: Eye,
};

const iconClassMap: Record<DetailItemProps['label'], string> = {
  humidity: styles.iconHumidity,
  wind: styles.iconWind,
  pressure: styles.iconPressure,
  visibility: styles.iconVisibility,
};

// Заголовки для отображения
const labelToTitle: Record<DetailItemProps['label'], string> = {
  humidity: 'Humidity',
  wind: 'Wind',
  pressure: 'Pressure',
  visibility: 'Visibility',
};

export const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
  const Icon = weatherIcons[label];

  return (
    <>
      <div className={styles.detailItem}>
        <Icon size={24} className={iconClassMap[label]} />
        <div>
          <span className="text-muted">{labelToTitle[label]}</span>
          <p>{value}</p>
        </div>
      </div>
    </>
  );
};
