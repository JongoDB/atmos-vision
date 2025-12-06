import { Droplets, Wind, Gauge, Eye } from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';
import { getWeatherDescription, getWeatherIcon } from '../../utils/weatherCodes';
import {
  formatTemperature,
  formatSpeed,
  formatPressure,
  formatVisibility,
  getWindDirection,
  getUVIndexCategory,
  getComfortLevel,
} from '../../utils/units';

export default function CurrentConditionsWidget() {
  const { currentWeather, currentLocation, preferences } = useWeatherStore();

  if (!currentWeather || !currentLocation) return null;

  const weatherIcon = getWeatherIcon(currentWeather.weatherCode, !currentWeather.isDay);
  const weatherDesc = getWeatherDescription(currentWeather.weatherCode);
  const uvInfo = getUVIndexCategory(currentWeather.uvIndex);
  const comfortInfo = getComfortLevel(currentWeather.temperature, currentWeather.humidity);

  return (
    <div className="col-span-full xl:col-span-3">
      <div className="weather-card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Current Conditions
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(currentWeather.time).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Temperature & Condition */}
          <div className="flex items-center space-x-6">
            <div className="text-7xl">{weatherIcon}</div>
            <div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white">
                {formatTemperature(currentWeather.temperature, preferences.temperatureUnit, 0)}
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400 mt-1">{weatherDesc}</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Feels like{' '}
                {formatTemperature(
                  currentWeather.apparentTemperature,
                  preferences.temperatureUnit,
                  0
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Droplets className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Humidity</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentWeather.humidity}%
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Wind className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Wind</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatSpeed(currentWeather.windSpeed, preferences.speedUnit, 0)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {getWindDirection(currentWeather.windDirection)}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Gauge className="w-8 h-8 text-purple-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Pressure</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatPressure(currentWeather.pressure, preferences.pressureUnit, 0)}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <Eye className="w-8 h-8 text-gray-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Visibility</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatVisibility(currentWeather.visibility, preferences.temperatureUnit)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Dew Point</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatTemperature(currentWeather.dewPoint, preferences.temperatureUnit)}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cloud Cover</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {currentWeather.cloudCover}%
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">UV Index</div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: uvInfo.color }}
              ></div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {currentWeather.uvIndex} - {uvInfo.category}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Comfort Level</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {comfortInfo.level}
            </div>
          </div>
        </div>

        {currentWeather.windGust && currentWeather.windGust > currentWeather.windSpeed && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                Wind gusts up to {formatSpeed(currentWeather.windGust, preferences.speedUnit, 0)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
