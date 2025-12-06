import { useEffect } from 'react';
import { useWeatherStore } from '../stores/weatherStore';
import { fetchWeatherData, fetchAirQuality, fetchMarineForecast } from '../services/openMeteoApi';
import { fetchWeatherAlerts } from '../services/nwsApi';
import type { HourlyForecast, DailyForecast, CurrentWeather } from '../types/weather';

export function useWeatherData() {
  const {
    currentLocation,
    setCurrentWeather,
    setHourlyForecast,
    setDailyForecast,
    setWeatherAlerts,
    setAirQuality,
    setMarineForecast,
    setLoading,
    setError,
  } = useWeatherStore();

  useEffect(() => {
    if (!currentLocation) return;

    const fetchAllWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch main weather data
        const weatherData = await fetchWeatherData({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          timezone: currentLocation.timezone,
        });

        // Parse current weather
        const current = weatherData.current;
        const currentWeather: CurrentWeather = {
          temperature: current.temperature_2m,
          apparentTemperature: current.apparent_temperature,
          humidity: current.relative_humidity_2m,
          dewPoint: current.dew_point_2m,
          pressure: current.pressure_msl,
          windSpeed: current.wind_speed_10m,
          windDirection: current.wind_direction_10m,
          windGust: current.wind_gusts_10m,
          cloudCover: current.cloud_cover,
          visibility: 10000, // Default value
          uvIndex: 0,
          precipitation: current.precipitation,
          weatherCode: current.weather_code,
          weatherDescription: '',
          isDay: current.is_day === 1,
          time: current.time,
        };

        setCurrentWeather(currentWeather);

        // Parse hourly forecast
        const hourlyData: HourlyForecast[] = [];
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
          hourlyData.push({
            time: weatherData.hourly.time[i],
            temperature: weatherData.hourly.temperature_2m[i],
            apparentTemperature: weatherData.hourly.apparent_temperature[i],
            precipitation: weatherData.hourly.precipitation[i],
            precipitationProbability: weatherData.hourly.precipitation_probability[i],
            weatherCode: weatherData.hourly.weather_code[i],
            cloudCover: weatherData.hourly.cloud_cover[i],
            windSpeed: weatherData.hourly.wind_speed_10m[i],
            windDirection: weatherData.hourly.wind_direction_10m[i],
            humidity: weatherData.hourly.relative_humidity_2m[i],
            dewPoint: weatherData.hourly.dew_point_2m[i],
            pressure: weatherData.hourly.pressure_msl[i],
            visibility: weatherData.hourly.visibility[i],
            uvIndex: weatherData.hourly.uv_index[i],
          });
        }

        setHourlyForecast(hourlyData);

        // Parse daily forecast
        const dailyData: DailyForecast[] = [];
        for (let i = 0; i < weatherData.daily.time.length; i++) {
          dailyData.push({
            date: weatherData.daily.time[i],
            temperatureMax: weatherData.daily.temperature_2m_max[i],
            temperatureMin: weatherData.daily.temperature_2m_min[i],
            apparentTemperatureMax: weatherData.daily.apparent_temperature_max[i],
            apparentTemperatureMin: weatherData.daily.apparent_temperature_min[i],
            sunrise: weatherData.daily.sunrise[i],
            sunset: weatherData.daily.sunset[i],
            precipitationSum: weatherData.daily.precipitation_sum[i],
            precipitationProbabilityMax: weatherData.daily.precipitation_probability_max[i],
            weatherCode: weatherData.daily.weather_code[i],
            windSpeedMax: weatherData.daily.wind_speed_10m_max[i],
            windGustMax: weatherData.daily.wind_gusts_10m_max[i],
            windDirection: weatherData.daily.wind_direction_10m_dominant[i],
            uvIndexMax: weatherData.daily.uv_index_max[i],
          });
        }

        setDailyForecast(dailyData);

        // Fetch alerts (NWS - US only)
        // Only fetch if location is in US (rough check)
        if (
          currentLocation.latitude >= 24 &&
          currentLocation.latitude <= 50 &&
          currentLocation.longitude >= -125 &&
          currentLocation.longitude <= -66
        ) {
          try {
            const alerts = await fetchWeatherAlerts(
              currentLocation.latitude,
              currentLocation.longitude
            );
            setWeatherAlerts(alerts);
          } catch (error) {
            console.warn('Could not fetch weather alerts:', error);
            setWeatherAlerts([]);
          }
        }

        // Fetch air quality
        try {
          const airQualityData = await fetchAirQuality(
            currentLocation.latitude,
            currentLocation.longitude
          );
          setAirQuality(airQualityData);
        } catch (error) {
          console.warn('Could not fetch air quality:', error);
        }

        // Fetch marine forecast (for coastal locations)
        try {
          const marineData = await fetchMarineForecast(
            currentLocation.latitude,
            currentLocation.longitude
          );
          setMarineForecast(marineData);
        } catch (error) {
          console.warn('Could not fetch marine forecast:', error);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data. Please try again.');
        setLoading(false);
      }
    };

    fetchAllWeatherData();

    // Refresh data every 10 minutes
    const interval = setInterval(fetchAllWeatherData, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentLocation]);

  return null;
}
