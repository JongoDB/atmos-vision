import axios from 'axios';
import type { WeatherAlert } from '../types/weather';

const BASE_URL = 'https://api.weather.gov';

// User agent is required by NWS API
const USER_AGENT = 'AtmosVision Pro (open-source weather app)';

// Fetch active weather alerts for a location
export async function fetchWeatherAlerts(
  latitude: number,
  longitude: number
): Promise<WeatherAlert[]> {
  try {
    const response = await axios.get(`${BASE_URL}/alerts/active`, {
      params: {
        point: `${latitude},${longitude}`,
      },
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    const features = response.data.features || [];

    return features.map((feature: any) => ({
      id: feature.id,
      event: feature.properties.event,
      headline: feature.properties.headline || feature.properties.event,
      description: feature.properties.description,
      severity: feature.properties.severity || 'Unknown',
      urgency: feature.properties.urgency || 'Unknown',
      certainty: feature.properties.certainty || 'Unknown',
      onset: feature.properties.onset,
      expires: feature.properties.expires,
      areaDesc: feature.properties.areaDesc,
      instruction: feature.properties.instruction,
    }));
  } catch (error) {
    console.error('Error fetching NWS alerts:', error);
    return [];
  }
}

// Fetch forecast office information
export async function fetchForecastOffice(latitude: number, longitude: number) {
  try {
    const response = await axios.get(`${BASE_URL}/points/${latitude},${longitude}`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    return response.data.properties;
  } catch (error) {
    console.error('Error fetching forecast office:', error);
    return null;
  }
}

// Fetch detailed forecast discussion
export async function fetchForecastDiscussion(latitude: number, longitude: number) {
  try {
    const pointData = await fetchForecastOffice(latitude, longitude);
    if (!pointData) return null;

    const forecastOffice = pointData.cwa;
    const response = await axios.get(
      `${BASE_URL}/products/types/AFD/locations/${forecastOffice}`,
      {
        headers: {
          'User-Agent': USER_AGENT,
        },
      }
    );

    const productId = response.data['@graph']?.[0]?.['@id'];
    if (!productId) return null;

    const discussionResponse = await axios.get(productId, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    return discussionResponse.data.productText;
  } catch (error) {
    console.error('Error fetching forecast discussion:', error);
    return null;
  }
}

// Fetch radar station information
export async function fetchNearestRadarStation(latitude: number, longitude: number) {
  try {
    const response = await axios.get(`${BASE_URL}/points/${latitude},${longitude}/stations`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    const stations = response.data.features;
    if (stations && stations.length > 0) {
      return {
        id: stations[0].properties.stationIdentifier,
        name: stations[0].properties.name,
        latitude: stations[0].geometry.coordinates[1],
        longitude: stations[0].geometry.coordinates[0],
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching radar station:', error);
    return null;
  }
}

// Fetch observation data from nearest station
export async function fetchObservations(latitude: number, longitude: number) {
  try {
    const response = await axios.get(`${BASE_URL}/points/${latitude},${longitude}/stations`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    const stationUrl = response.data.features?.[0]?.id;
    if (!stationUrl) return null;

    const obsResponse = await axios.get(`${stationUrl}/observations/latest`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    return obsResponse.data.properties;
  } catch (error) {
    console.error('Error fetching observations:', error);
    return null;
  }
}

// Fetch gridpoint forecast (detailed hourly)
export async function fetchGridpointForecast(latitude: number, longitude: number) {
  try {
    const pointResponse = await axios.get(`${BASE_URL}/points/${latitude},${longitude}`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    });

    const forecastUrl = pointResponse.data.properties.forecast;
    const forecastHourlyUrl = pointResponse.data.properties.forecastHourly;

    const [forecast, hourlyForecast] = await Promise.all([
      axios.get(forecastUrl, { headers: { 'User-Agent': USER_AGENT } }),
      axios.get(forecastHourlyUrl, { headers: { 'User-Agent': USER_AGENT } }),
    ]);

    return {
      daily: forecast.data.properties.periods,
      hourly: hourlyForecast.data.properties.periods,
    };
  } catch (error) {
    console.error('Error fetching gridpoint forecast:', error);
    return null;
  }
}
