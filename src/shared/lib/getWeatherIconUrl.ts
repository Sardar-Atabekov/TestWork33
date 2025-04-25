type IconVariant = 'd' | 'n';

const getWeatherIconUrl = (
  iconCode: string,
  size: '1x' | '2x' | '4x' = '2x',
  variant?: IconVariant
) => {
  const baseUrl = 'https://openweathermap.org/img/wn/';
  const variantSuffix = variant
    ? `${iconCode.substring(0, 2)}${variant}`
    : iconCode;
  return `${baseUrl}${variantSuffix}@${size}.png`;
};

export default getWeatherIconUrl;
