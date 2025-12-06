// WMO Weather interpretation codes (WW)
// Used by Open-Meteo and other services

export interface WeatherCodeInfo {
  code: number;
  description: string;
  icon: string;
  severity: 'clear' | 'partly-cloudy' | 'cloudy' | 'rain' | 'snow' | 'thunderstorm' | 'fog' | 'extreme';
}

export const weatherCodes: Record<number, WeatherCodeInfo> = {
  0: {
    code: 0,
    description: 'Clear sky',
    icon: '☀️',
    severity: 'clear',
  },
  1: {
    code: 1,
    description: 'Mainly clear',
    icon: '🌤️',
    severity: 'partly-cloudy',
  },
  2: {
    code: 2,
    description: 'Partly cloudy',
    icon: '⛅',
    severity: 'partly-cloudy',
  },
  3: {
    code: 3,
    description: 'Overcast',
    icon: '☁️',
    severity: 'cloudy',
  },
  45: {
    code: 45,
    description: 'Fog',
    icon: '🌫️',
    severity: 'fog',
  },
  48: {
    code: 48,
    description: 'Depositing rime fog',
    icon: '🌫️',
    severity: 'fog',
  },
  51: {
    code: 51,
    description: 'Light drizzle',
    icon: '🌦️',
    severity: 'rain',
  },
  53: {
    code: 53,
    description: 'Moderate drizzle',
    icon: '🌦️',
    severity: 'rain',
  },
  55: {
    code: 55,
    description: 'Dense drizzle',
    icon: '🌧️',
    severity: 'rain',
  },
  56: {
    code: 56,
    description: 'Light freezing drizzle',
    icon: '🌧️',
    severity: 'rain',
  },
  57: {
    code: 57,
    description: 'Dense freezing drizzle',
    icon: '🌧️',
    severity: 'rain',
  },
  61: {
    code: 61,
    description: 'Slight rain',
    icon: '🌧️',
    severity: 'rain',
  },
  63: {
    code: 63,
    description: 'Moderate rain',
    icon: '🌧️',
    severity: 'rain',
  },
  65: {
    code: 65,
    description: 'Heavy rain',
    icon: '🌧️',
    severity: 'rain',
  },
  66: {
    code: 66,
    description: 'Light freezing rain',
    icon: '🌧️',
    severity: 'rain',
  },
  67: {
    code: 67,
    description: 'Heavy freezing rain',
    icon: '🌧️',
    severity: 'extreme',
  },
  71: {
    code: 71,
    description: 'Slight snow fall',
    icon: '🌨️',
    severity: 'snow',
  },
  73: {
    code: 73,
    description: 'Moderate snow fall',
    icon: '🌨️',
    severity: 'snow',
  },
  75: {
    code: 75,
    description: 'Heavy snow fall',
    icon: '❄️',
    severity: 'snow',
  },
  77: {
    code: 77,
    description: 'Snow grains',
    icon: '🌨️',
    severity: 'snow',
  },
  80: {
    code: 80,
    description: 'Slight rain showers',
    icon: '🌦️',
    severity: 'rain',
  },
  81: {
    code: 81,
    description: 'Moderate rain showers',
    icon: '🌧️',
    severity: 'rain',
  },
  82: {
    code: 82,
    description: 'Violent rain showers',
    icon: '🌧️',
    severity: 'extreme',
  },
  85: {
    code: 85,
    description: 'Slight snow showers',
    icon: '🌨️',
    severity: 'snow',
  },
  86: {
    code: 86,
    description: 'Heavy snow showers',
    icon: '❄️',
    severity: 'snow',
  },
  95: {
    code: 95,
    description: 'Thunderstorm',
    icon: '⛈️',
    severity: 'thunderstorm',
  },
  96: {
    code: 96,
    description: 'Thunderstorm with slight hail',
    icon: '⛈️',
    severity: 'thunderstorm',
  },
  99: {
    code: 99,
    description: 'Thunderstorm with heavy hail',
    icon: '⛈️',
    severity: 'extreme',
  },
};

export function getWeatherDescription(code: number): string {
  return weatherCodes[code]?.description || 'Unknown';
}

export function getWeatherIcon(code: number, isNight: boolean = false): string {
  const info = weatherCodes[code];
  if (!info) return '❓';

  // Adjust for night conditions
  if (isNight && (code === 0 || code === 1)) {
    return '🌙';
  }

  return info.icon;
}

export function getWeatherSeverity(code: number): string {
  return weatherCodes[code]?.severity || 'clear';
}
