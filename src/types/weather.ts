// Core weather data types for AtmosVision Pro

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  elevation?: number;
  country?: string;
  state?: string;
  isFavorite: boolean;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  dewPoint: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGust?: number;
  cloudCover: number;
  visibility: number;
  uvIndex: number;
  precipitation: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  time: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  apparentTemperature: number;
  precipitation: number;
  precipitationProbability: number;
  weatherCode: number;
  cloudCover: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  dewPoint: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
}

export interface DailyForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  apparentTemperatureMax: number;
  apparentTemperatureMin: number;
  sunrise: string;
  sunset: string;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  weatherCode: number;
  windSpeedMax: number;
  windGustMax: number;
  windDirection: number;
  uvIndexMax: number;
}

export interface WeatherAlert {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown';
  urgency: 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown';
  certainty: 'Observed' | 'Likely' | 'Possible' | 'Unlikely' | 'Unknown';
  onset: string;
  expires: string;
  areaDesc: string;
  instruction?: string;
}

export interface AtmosphericSounding {
  time: string;
  levels: {
    pressure: number; // hPa
    height: number; // meters
    temperature: number; // Celsius
    dewPoint: number; // Celsius
    windSpeed: number; // m/s
    windDirection: number; // degrees
  }[];
  cape?: number; // Convective Available Potential Energy
  cin?: number; // Convective Inhibition
  liftedIndex?: number;
  helicity?: number; // Storm Relative Helicity
  shear?: number; // Wind shear
}

export interface RadarData {
  time: string;
  type: 'reflectivity' | 'velocity' | 'composite';
  imageUrl: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface SatelliteData {
  time: string;
  type: 'visible' | 'infrared' | 'water-vapor';
  imageUrl: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface AirQuality {
  time: string;
  aqi: number; // Air Quality Index
  pm2_5: number;
  pm10: number;
  o3: number; // Ozone
  no2: number; // Nitrogen Dioxide
  so2: number; // Sulfur Dioxide
  co: number; // Carbon Monoxide
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
}

export interface MarineForecast {
  time: string;
  waveHeight: number; // meters
  wavePeriod: number; // seconds
  waveDirection: number; // degrees
  swellHeight: number;
  swellPeriod: number;
  swellDirection: number;
  seaTemperature: number;
  currentSpeed: number;
  currentDirection: number;
}

export interface AviationWeather {
  metar?: string;
  taf?: string;
  airmets: string[];
  sigmets: string[];
  pireps: string[];
}

export interface ModelData {
  model: 'GFS' | 'NAM' | 'HRRR' | 'ECMWF' | 'ICON';
  initTime: string;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface EnsembleForecast {
  time: string;
  mean: number;
  median: number;
  min: number;
  max: number;
  stdDev: number;
  members: number[];
}

export interface LightningStrike {
  id: string;
  latitude: number;
  longitude: number;
  time: string;
  polarity: 'positive' | 'negative';
  peakCurrent: number;
}

export interface StormCell {
  id: string;
  latitude: number;
  longitude: number;
  movement: {
    speed: number; // km/h
    direction: number; // degrees
  };
  intensity: number;
  top: number; // meters
  vil: number; // Vertically Integrated Liquid
  probability: {
    tornado: number;
    hail: number;
    damaging_wind: number;
  };
}

export interface HistoricalWeather {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  snowfall: number;
}

export interface ClimateNormals {
  month: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  snowfall: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type SpeedUnit = 'kmh' | 'mph' | 'ms' | 'knots';
export type PrecipitationUnit = 'mm' | 'inch';
export type PressureUnit = 'hpa' | 'inhg' | 'mb';

export interface UserPreferences {
  temperatureUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  precipitationUnit: PrecipitationUnit;
  pressureUnit: PressureUnit;
  darkMode: boolean;
  defaultLocation?: Location;
  favoriteLocations: Location[];
  enableNotifications: boolean;
  alertThresholds: {
    temperature?: { min?: number; max?: number };
    windSpeed?: number;
    precipitation?: number;
  };
}
