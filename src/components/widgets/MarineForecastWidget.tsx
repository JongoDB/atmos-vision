import { Waves, Wind, Compass, Thermometer } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useWeatherStore } from '../../stores/weatherStore';
import { formatTemperature } from '../../utils/units';

export default function MarineForecastWidget() {
  const { marineForecast, preferences } = useWeatherStore();

  if (!marineForecast || marineForecast.length === 0) {
    return (
      <div className="weather-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Waves className="w-6 h-6 text-blue-500" />
          <span>Marine Forecast</span>
        </h2>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Marine forecast data not available for this location.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Try a coastal or ocean location for wave and current forecasts.
          </p>
        </div>
      </div>
    );
  }

  // Show next 48 hours
  const hours = marineForecast.slice(0, 48);
  const current = marineForecast[0];

  const getWaveHeightColor = (height: number) => {
    if (height < 1) return 'text-green-600 dark:text-green-400';
    if (height < 2) return 'text-yellow-600 dark:text-yellow-400';
    if (height < 3) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getWaveCondition = (height: number) => {
    if (height < 1) return 'Calm';
    if (height < 2) return 'Moderate';
    if (height < 3) return 'Rough';
    return 'Very Rough';
  };

  return (
    <div className="space-y-6">
      {/* Current Marine Conditions */}
      <div className="weather-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Waves className="w-6 h-6 text-blue-500" />
          <span>Current Marine Conditions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Wave Height */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Waves className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Wave Height</div>
                <div className={`text-2xl font-bold ${getWaveHeightColor(current.waveHeight)}`}>
                  {current.waveHeight.toFixed(1)}m
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {getWaveCondition(current.waveHeight)}
                </div>
              </div>
            </div>
          </div>

          {/* Wave Period */}
          <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Waves className="w-8 h-8 text-cyan-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Wave Period</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {current.wavePeriod.toFixed(1)}s
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {current.waveDirection}°
                </div>
              </div>
            </div>
          </div>

          {/* Swell */}
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Waves className="w-8 h-8 text-indigo-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Swell Height</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {current.swellHeight.toFixed(1)}m
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {current.swellPeriod.toFixed(1)}s period
                </div>
              </div>
            </div>
          </div>

          {/* Current */}
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Wind className="w-8 h-8 text-teal-500" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Current Speed</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(current.currentSpeed * 1.94384).toFixed(1)} kt
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {current.currentDirection}°
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Wave Direction</div>
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {current.waveDirection}°
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Swell Direction</div>
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {current.swellDirection}°
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Direction</div>
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {current.currentDirection}°
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sea Temperature</div>
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {current.seaTemperature > 0 ? formatTemperature(current.seaTemperature, preferences.temperatureUnit) : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 48-Hour Wave Forecast */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          48-Hour Wave Forecast
        </h3>

        <div className="overflow-x-auto custom-scrollbar">
          <div className="flex space-x-4 pb-2">
            {hours.map((hour, index) => {
              const time = parseISO(hour.time);
              const isNow = index === 0;

              return (
                <div
                  key={hour.time}
                  className={`flex-shrink-0 w-32 text-center p-3 rounded-lg transition-colors ${
                    isNow
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {/* Time */}
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    {isNow ? 'Now' : format(time, 'ha')}
                  </div>

                  {/* Wave Height */}
                  <div className="mb-2">
                    <Waves className={`w-8 h-8 mx-auto ${getWaveHeightColor(hour.waveHeight)}`} />
                    <div className={`text-lg font-bold mt-1 ${getWaveHeightColor(hour.waveHeight)}`}>
                      {hour.waveHeight.toFixed(1)}m
                    </div>
                  </div>

                  {/* Wave Period */}
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {hour.wavePeriod.toFixed(1)}s period
                  </div>

                  {/* Swell */}
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-xs text-gray-500 dark:text-gray-500">Swell</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {hour.swellHeight.toFixed(1)}m
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wave Height Chart */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Wave Height Trend
          </h4>
          <div className="flex items-end space-x-1 h-32">
            {hours.slice(0, 24).map((hour, index) => {
              const maxHeight = Math.max(...hours.slice(0, 24).map(h => h.waveHeight));
              const height = (hour.waveHeight / (maxHeight || 1)) * 100;
              const color = hour.waveHeight < 1 ? 'bg-green-500' :
                           hour.waveHeight < 2 ? 'bg-yellow-500' :
                           hour.waveHeight < 3 ? 'bg-orange-500' : 'bg-red-500';

              return (
                <div key={index} className="flex-1 flex flex-col justify-end">
                  <div
                    className={`${color} dark:opacity-80 rounded-t transition-all hover:opacity-100`}
                    style={{ height: `${height}%` }}
                    title={`${hour.waveHeight.toFixed(1)}m at ${format(parseISO(hour.time), 'ha')}`}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>0m</span>
            <span>{Math.max(...hours.slice(0, 24).map(h => h.waveHeight)).toFixed(1)}m</span>
          </div>
        </div>
      </div>

      {/* Marine Safety Info */}
      <div className="weather-card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
          Marine Conditions Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold text-blue-800 dark:text-blue-300">Wave Height</div>
            <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
              <li>• &lt;1m: Calm - Safe for all vessels</li>
              <li>• 1-2m: Moderate - Caution for small craft</li>
              <li>• 2-3m: Rough - Small craft advisory</li>
              <li>• &gt;3m: Very Rough - High seas warning</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-blue-800 dark:text-blue-300">Current Conditions</div>
            <div className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
              <div>Waves: {getWaveCondition(current.waveHeight)}</div>
              <div>Current: {current.currentSpeed > 0.5 ? 'Strong' : 'Weak'}</div>
              <div>Swell: {current.swellHeight > 2 ? 'Significant' : 'Minimal'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
