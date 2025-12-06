import type {
  TemperatureUnit,
  SpeedUnit,
  PrecipitationUnit,
  PressureUnit,
} from '../types/weather';

// Temperature conversions
export function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number {
  if (from === to) return value;

  if (from === 'celsius' && to === 'fahrenheit') {
    return (value * 9) / 5 + 32;
  }

  if (from === 'fahrenheit' && to === 'celsius') {
    return ((value - 32) * 5) / 9;
  }

  return value;
}

export function formatTemperature(
  value: number,
  unit: TemperatureUnit,
  decimals: number = 1,
  fromUnit: TemperatureUnit = 'celsius'
): string {
  const converted = convertTemperature(value, fromUnit, unit);
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${converted.toFixed(decimals)}${symbol}`;
}

// Speed conversions
export function convertSpeed(value: number, from: SpeedUnit, to: SpeedUnit): number {
  const toMS: Record<SpeedUnit, number> = {
    ms: 1,
    kmh: 3.6,
    mph: 2.23694,
    knots: 1.94384,
  };

  // Convert to m/s first, then to target unit
  const inMS = value / toMS[from];
  return inMS * toMS[to];
}

export function formatSpeed(
  value: number,
  unit: SpeedUnit,
  decimals: number = 1,
  fromUnit: SpeedUnit = 'kmh'
): string {
  const converted = convertSpeed(value, fromUnit, unit);
  const symbols: Record<SpeedUnit, string> = {
    ms: 'm/s',
    kmh: 'km/h',
    mph: 'mph',
    knots: 'kt',
  };

  return `${converted.toFixed(decimals)} ${symbols[unit]}`;
}

// Precipitation conversions
export function convertPrecipitation(
  value: number,
  from: PrecipitationUnit,
  to: PrecipitationUnit
): number {
  if (from === to) return value;

  if (from === 'mm' && to === 'inch') {
    return value / 25.4;
  }

  if (from === 'inch' && to === 'mm') {
    return value * 25.4;
  }

  return value;
}

export function formatPrecipitation(
  value: number,
  unit: PrecipitationUnit,
  decimals: number = 1,
  fromUnit: PrecipitationUnit = 'mm'
): string {
  const converted = convertPrecipitation(value, fromUnit, unit);
  const symbol = unit === 'mm' ? 'mm' : 'in';
  return `${converted.toFixed(decimals)} ${symbol}`;
}

// Pressure conversions
export function convertPressure(
  value: number,
  from: PressureUnit,
  to: PressureUnit
): number {
  if (from === to) return value;

  const toHPa: Record<PressureUnit, number> = {
    hpa: 1,
    mb: 1,
    inhg: 33.8639,
  };

  // Convert to hPa first, then to target unit
  const inHPa = value / toHPa[from];
  return inHPa * toHPa[to];
}

export function formatPressure(
  value: number,
  unit: PressureUnit,
  decimals: number = 1,
  fromUnit: PressureUnit = 'hpa'
): string {
  const converted = convertPressure(value, fromUnit, unit);
  const symbols: Record<PressureUnit, string> = {
    hpa: 'hPa',
    mb: 'mb',
    inhg: 'inHg',
  };

  return `${converted.toFixed(decimals)} ${symbols[unit]}`;
}

// Wind direction
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function formatWindDirection(degrees: number): string {
  return `${getWindDirection(degrees)} (${degrees}°)`;
}

// UV Index
export function getUVIndexCategory(uvIndex: number): {
  category: string;
  color: string;
  advice: string;
} {
  if (uvIndex < 3) {
    return {
      category: 'Low',
      color: '#289500',
      advice: 'No protection needed',
    };
  } else if (uvIndex < 6) {
    return {
      category: 'Moderate',
      color: '#F7E400',
      advice: 'Protection recommended',
    };
  } else if (uvIndex < 8) {
    return {
      category: 'High',
      color: '#F85900',
      advice: 'Protection required',
    };
  } else if (uvIndex < 11) {
    return {
      category: 'Very High',
      color: '#D8001D',
      advice: 'Extra protection required',
    };
  } else {
    return {
      category: 'Extreme',
      color: '#6B49C8',
      advice: 'Stay indoors if possible',
    };
  }
}

// Visibility
export function formatVisibility(
  meters: number,
  temperatureUnit: TemperatureUnit = 'celsius'
): string {
  const isImperial = temperatureUnit === 'fahrenheit';

  if (isImperial) {
    const miles = meters / 1609.34;
    return `${miles.toFixed(1)} mi`;
  }

  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }

  return `${meters.toFixed(0)} m`;
}

// Humidity/Dewpoint analysis
export function getComfortLevel(temperature: number, humidity: number): {
  level: string;
  description: string;
} {
  const dewPoint = calculateDewPoint(temperature, humidity);

  if (dewPoint < 10) {
    return { level: 'Dry', description: 'A bit dry for some' };
  } else if (dewPoint < 13) {
    return { level: 'Comfortable', description: 'Very comfortable' };
  } else if (dewPoint < 16) {
    return { level: 'Pleasant', description: 'Comfortable for most' };
  } else if (dewPoint < 18) {
    return { level: 'Slightly Humid', description: 'Slightly humid' };
  } else if (dewPoint < 21) {
    return { level: 'Humid', description: 'Somewhat uncomfortable' };
  } else if (dewPoint < 24) {
    return { level: 'Very Humid', description: 'Quite uncomfortable' };
  } else {
    return { level: 'Oppressive', description: 'Extremely uncomfortable' };
  }
}

export function calculateDewPoint(temperature: number, humidity: number): number {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
  return (b * alpha) / (a - alpha);
}

// Heat Index
export function calculateHeatIndex(temperature: number, humidity: number): number {
  const T = temperature;
  const RH = humidity;

  if (T < 27) return T;

  const HI =
    -8.78469475556 +
    1.61139411 * T +
    2.33854883889 * RH +
    -0.14611605 * T * RH +
    -0.012308094 * T * T +
    -0.0164248277778 * RH * RH +
    0.002211732 * T * T * RH +
    0.00072546 * T * RH * RH +
    -0.000003582 * T * T * RH * RH;

  return HI;
}

// Wind Chill
export function calculateWindChill(temperature: number, windSpeed: number): number {
  if (temperature > 10 || windSpeed < 4.8) return temperature;

  const T = temperature;
  const V = windSpeed;

  return 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16);
}
