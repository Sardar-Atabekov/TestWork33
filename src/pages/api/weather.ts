// pages/api/weather.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentWeather } from '@shared/api/api'; // Путь к вашему методу получения данных о погоде

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const weatherData = await getCurrentWeather(String(city)); // Ваш метод получения данных о погоде
    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch weather',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
