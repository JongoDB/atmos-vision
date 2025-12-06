import { Wind } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useWeatherStore } from '../../stores/weatherStore';

export default function AirQualityWidget() {
  const { airQuality } = useWeatherStore();

  if (!airQuality || airQuality.length === 0) return null;

  const current = airQuality[0];

  const getAQIColor = (category: string) => {
    switch (category) {
      case 'Good':
        return 'bg-green-500';
      case 'Moderate':
        return 'bg-yellow-500';
      case 'Unhealthy for Sensitive Groups':
        return 'bg-orange-500';
      case 'Unhealthy':
        return 'bg-red-500';
      case 'Very Unhealthy':
        return 'bg-purple-500';
      case 'Hazardous':
        return 'bg-red-900';
      default:
        return 'bg-gray-500';
    }
  };

  const getAQITextColor = (category: string) => {
    switch (category) {
      case 'Good':
        return 'text-green-700 dark:text-green-300';
      case 'Moderate':
        return 'text-yellow-700 dark:text-yellow-300';
      case 'Unhealthy for Sensitive Groups':
        return 'text-orange-700 dark:text-orange-300';
      case 'Unhealthy':
        return 'text-red-700 dark:text-red-300';
      case 'Very Unhealthy':
        return 'text-purple-700 dark:text-purple-300';
      case 'Hazardous':
        return 'text-red-900 dark:text-red-200';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  const pollutants = [
    { name: 'PM2.5', value: current.pm2_5, unit: 'µg/m³', description: 'Fine Particles' },
    { name: 'PM10', value: current.pm10, unit: 'µg/m³', description: 'Coarse Particles' },
    { name: 'O₃', value: current.o3, unit: 'µg/m³', description: 'Ozone' },
    { name: 'NO₂', value: current.no2, unit: 'µg/m³', description: 'Nitrogen Dioxide' },
    { name: 'SO₂', value: current.so2, unit: 'µg/m³', description: 'Sulfur Dioxide' },
    { name: 'CO', value: current.co, unit: 'µg/m³', description: 'Carbon Monoxide' },
  ];

  return (
    <div className="weather-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Wind className="w-6 h-6" />
          <span>Air Quality Index</span>
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {format(parseISO(current.time), 'MMM d, h:mm a')}
        </div>
      </div>

      {/* AQI Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-5xl font-bold text-gray-900 dark:text-white">
              {current.aqi}
            </div>
            <div className={`text-lg font-semibold mt-1 ${getAQITextColor(current.category)}`}>
              {current.category}
            </div>
          </div>

          {/* AQI Scale */}
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">0-50</span>
              <div className="w-12 h-2 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Good</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">51-100</span>
              <div className="w-12 h-2 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Moderate</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">101-150</span>
              <div className="w-12 h-2 bg-orange-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Unhealthy (SG)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">151-200</span>
              <div className="w-12 h-2 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Unhealthy</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${getAQIColor(current.category)} transition-all`}
            style={{ width: `${Math.min((current.aqi / 200) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Pollutant Details */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Pollutant Concentrations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {pollutants.map((pollutant) => (
            <div
              key={pollutant.name}
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {pollutant.description}
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                {pollutant.value.toFixed(1)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {pollutant.unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
          Health Recommendations
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          {current.category === 'Good' && 'Air quality is satisfactory. Enjoy outdoor activities!'}
          {current.category === 'Moderate' && 'Air quality is acceptable for most people. Unusually sensitive people should consider limiting prolonged outdoor exertion.'}
          {current.category === 'Unhealthy for Sensitive Groups' && 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'}
          {current.category === 'Unhealthy' && 'Everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects.'}
          {current.category === 'Very Unhealthy' && 'Health alert: everyone may experience more serious health effects. Avoid outdoor activities.'}
          {current.category === 'Hazardous' && 'Health warnings of emergency conditions. The entire population is likely to be affected. Stay indoors.'}
        </p>
      </div>
    </div>
  );
}
