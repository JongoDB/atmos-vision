import { format, parseISO } from 'date-fns';
import { Droplet, Wind, Sunrise, Sunset } from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';
import { getWeatherIcon, getWeatherDescription } from '../../utils/weatherCodes';
import { formatTemperature, formatSpeed, formatPrecipitation } from '../../utils/units';

export default function DailyForecastWidget() {
  const { dailyForecast, preferences } = useWeatherStore();

  if (!dailyForecast || dailyForecast.length === 0) return null;

  return (
    <div className="weather-card">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        16-Day Forecast
      </h2>

      <div className="space-y-3">
        {dailyForecast.map((day, index) => {
          const date = parseISO(day.date);
          const isToday = index === 0;

          return (
            <div
              key={day.date}
              className={`p-4 rounded-lg transition-colors ${
                isToday
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Date */}
                <div className="md:col-span-2">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {isToday ? 'Today' : format(date, 'EEEE')}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {format(date, 'MMM d')}
                  </div>
                </div>

                {/* Weather Icon & Description */}
                <div className="md:col-span-3 flex items-center space-x-3">
                  <div className="text-4xl">{getWeatherIcon(day.weatherCode)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {getWeatherDescription(day.weatherCode)}
                  </div>
                </div>

                {/* Temperature Range */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatTemperature(day.temperatureMax, preferences.temperatureUnit, 0)}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-lg text-gray-600 dark:text-gray-400">
                      {formatTemperature(day.temperatureMin, preferences.temperatureUnit, 0)}
                    </span>
                  </div>
                </div>

                {/* Precipitation */}
                <div className="md:col-span-3">
                  <div className={`flex items-center space-x-2 ${
                    day.precipitationProbabilityMax > 30
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    <Droplet className="w-4 h-4" />
                    <span className="text-sm">{day.precipitationProbabilityMax || 0}%</span>
                    {day.precipitationSum > 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({formatPrecipitation(day.precipitationSum, preferences.precipitationUnit)})
                      </span>
                    )}
                  </div>
                </div>

                {/* Wind */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Wind className="w-4 h-4" />
                    <span className="text-sm">
                      {formatSpeed(day.windSpeedMax, preferences.speedUnit, 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Details (expandable) */}
              {isToday && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Sunrise className="w-4 h-4" />
                    <div>
                      <div className="text-xs">Sunrise</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {format(parseISO(day.sunrise), 'h:mm a')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Sunset className="w-4 h-4" />
                    <div>
                      <div className="text-xs">Sunset</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {format(parseISO(day.sunset), 'h:mm a')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">UV Index</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {day.uvIndexMax}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Max Wind Gust</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatSpeed(day.windGustMax, preferences.speedUnit, 0)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
