import { format, parseISO } from 'date-fns';
import { useWeatherStore } from '../../stores/weatherStore';
import { getWeatherIcon } from '../../utils/weatherCodes';
import { formatTemperature, formatSpeed } from '../../utils/units';

export default function HourlyForecastWidget() {
  const { hourlyForecast, preferences } = useWeatherStore();

  if (!hourlyForecast || hourlyForecast.length === 0) return null;

  // Show next 48 hours
  const hours = hourlyForecast.slice(0, 48);

  return (
    <div className="weather-card overflow-hidden">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        48-Hour Forecast
      </h2>

      <div className="overflow-x-auto overflow-y-hidden custom-scrollbar -mx-6 px-6">
        <div className="flex space-x-4 pb-2 min-w-max">
          {hours.map((hour, index) => {
            const time = parseISO(hour.time);
            const isNow = index === 0;

            return (
              <div
                key={hour.time}
                className={`flex-shrink-0 w-24 text-center p-3 rounded-lg transition-colors ${
                  isNow
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {/* Time */}
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {isNow ? 'Now' : format(time, 'ha')}
                </div>

                {/* Weather Icon */}
                <div className="text-3xl my-2">
                  {getWeatherIcon(hour.weatherCode, time.getHours() < 6 || time.getHours() > 18)}
                </div>

                {/* Temperature */}
                <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {formatTemperature(hour.temperature, preferences.temperatureUnit, 0)}
                </div>

                {/* Precipitation */}
                <div className={`text-xs mb-1 ${
                  hour.precipitationProbability > 30
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  💧 {hour.precipitationProbability || 0}%
                </div>

                {/* Wind */}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatSpeed(hour.windSpeed, preferences.speedUnit, 0)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
