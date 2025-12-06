import axios from 'axios';
import type {
  AirQuality,
  MarineForecast,
} from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';

export interface OpenMeteoParams {
  latitude: number;
  longitude: number;
  timezone?: string;
}

// Fetch current weather and forecast
export async function fetchWeatherData(params: OpenMeteoParams) {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: params.latitude,
        longitude: params.longitude,
        timezone: params.timezone || 'auto',
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'dew_point_2m',
          'precipitation',
          'weather_code',
          'pressure_msl',
          'surface_pressure',
          'cloud_cover',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m',
          'is_day',
        ].join(','),
        hourly: [
          'temperature_2m',
          'apparent_temperature',
          'precipitation_probability',
          'precipitation',
          'weather_code',
          'cloud_cover',
          'wind_speed_10m',
          'wind_direction_10m',
          'relative_humidity_2m',
          'dew_point_2m',
          'pressure_msl',
          'visibility',
          'uv_index',
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'apparent_temperature_max',
          'apparent_temperature_min',
          'sunrise',
          'sunset',
          'precipitation_sum',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'wind_gusts_10m_max',
          'wind_direction_10m_dominant',
          'uv_index_max',
        ].join(','),
        forecast_days: 16,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Fetch historical weather data
export async function fetchHistoricalWeather(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
) {
  try {
    const response = await axios.get(`${BASE_URL}/archive`, {
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'snowfall_sum',
          'weather_code',
        ].join(','),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
}

// Fetch air quality data
export async function fetchAirQuality(
  latitude: number,
  longitude: number
): Promise<AirQuality[]> {
  try {
    const response = await axios.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
      params: {
        latitude,
        longitude,
        hourly: ['pm10', 'pm2_5', 'carbon_monoxide', 'nitrogen_dioxide', 'sulphur_dioxide', 'ozone', 'us_aqi'].join(','),
        forecast_days: 5,
      },
    });

    const data = response.data;
    const airQuality: AirQuality[] = [];

    for (let i = 0; i < data.hourly.time.length; i++) {
      const aqi = data.hourly.us_aqi[i] || 0;
      let category: AirQuality['category'] = 'Good';

      if (aqi <= 50) category = 'Good';
      else if (aqi <= 100) category = 'Moderate';
      else if (aqi <= 150) category = 'Unhealthy for Sensitive Groups';
      else if (aqi <= 200) category = 'Unhealthy';
      else if (aqi <= 300) category = 'Very Unhealthy';
      else category = 'Hazardous';

      airQuality.push({
        time: data.hourly.time[i],
        aqi,
        pm2_5: data.hourly.pm2_5[i] || 0,
        pm10: data.hourly.pm10[i] || 0,
        o3: data.hourly.ozone[i] || 0,
        no2: data.hourly.nitrogen_dioxide[i] || 0,
        so2: data.hourly.sulphur_dioxide[i] || 0,
        co: data.hourly.carbon_monoxide[i] || 0,
        category,
      });
    }

    return airQuality;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    throw error;
  }
}

// Fetch marine/ocean forecast
export async function fetchMarineForecast(
  latitude: number,
  longitude: number
): Promise<MarineForecast[]> {
  try {
    const response = await axios.get('https://marine-api.open-meteo.com/v1/marine', {
      params: {
        latitude,
        longitude,
        hourly: [
          'wave_height',
          'wave_direction',
          'wave_period',
          'swell_wave_height',
          'swell_wave_direction',
          'swell_wave_period',
          'ocean_current_velocity',
          'ocean_current_direction',
        ].join(','),
        daily: 'wave_height_max',
        forecast_days: 7,
      },
    });

    const data = response.data;
    const marine: MarineForecast[] = [];

    for (let i = 0; i < data.hourly.time.length; i++) {
      marine.push({
        time: data.hourly.time[i],
        waveHeight: data.hourly.wave_height[i] || 0,
        wavePeriod: data.hourly.wave_period[i] || 0,
        waveDirection: data.hourly.wave_direction[i] || 0,
        swellHeight: data.hourly.swell_wave_height[i] || 0,
        swellPeriod: data.hourly.swell_wave_period[i] || 0,
        swellDirection: data.hourly.swell_wave_direction[i] || 0,
        seaTemperature: 0, // Not available in free tier
        currentSpeed: data.hourly.ocean_current_velocity[i] || 0,
        currentDirection: data.hourly.ocean_current_direction[i] || 0,
      });
    }

    return marine;
  } catch (error) {
    console.error('Error fetching marine forecast:', error);
    throw error;
  }
}

// Geocoding API for location search
export async function searchLocation(query: string) {
  try {
    const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: query,
        count: 10,
        language: 'en',
        format: 'json',
      },
    });

    return response.data.results || [];
  } catch (error) {
    console.error('Error searching location:', error);
    throw error;
  }
}

// Fetch ensemble forecast data
export async function fetchEnsembleForecast(latitude: number, longitude: number) {
  try {
    const response = await axios.get(`${BASE_URL}/ensemble`, {
      params: {
        latitude,
        longitude,
        hourly: 'temperature_2m',
        models: 'icon_seamless',
        forecast_days: 7,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching ensemble forecast:', error);
    throw error;
  }
}

// Fetch climate data (historical normals)
export async function fetchClimateData(
  latitude: number,
  longitude: number,
  startDate: string = '1991-01-01',
  endDate: string = '2020-12-31'
) {
  try {
    const response = await axios.get(`${BASE_URL}/climate`, {
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        daily: ['temperature_2m_mean', 'precipitation_sum', 'snowfall_sum'].join(','),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching climate data:', error);
    throw error;
  }
}

// Fetch elevation data
export async function fetchElevation(latitude: number, longitude: number) {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/elevation', {
      params: {
        latitude,
        longitude,
      },
    });

    return response.data.elevation?.[0] || 0;
  } catch (error) {
    console.error('Error fetching elevation:', error);
    return 0;
  }
}
