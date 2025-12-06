import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, addHours } from 'date-fns';
import { useWeatherStore } from '../../stores/weatherStore';

export default function ModelComparisonWidget() {
  const { currentLocation, preferences } = useWeatherStore();
  const tempUnit = preferences.temperatureUnit === 'celsius' ? '°C' : '°F';

  // Mock model data (in production, fetch from multiple weather model APIs)
  const models = ['GFS', 'NAM', 'HRRR', 'ECMWF', 'ICON'];

  // Generate mock forecast data for comparison
  const generateModelData = () => {
    const now = new Date();
    const data = [];

    for (let i = 0; i < 48; i += 3) {
      const time = addHours(now, i);
      data.push({
        time: format(time, 'MMM d, ha'),
        timestamp: time.getTime(),
        GFS: 15 + Math.random() * 8 + Math.sin(i / 12) * 5,
        NAM: 16 + Math.random() * 7 + Math.sin(i / 12) * 5,
        HRRR: 15.5 + Math.random() * 7.5 + Math.sin(i / 12) * 5,
        ECMWF: 16.5 + Math.random() * 6 + Math.sin(i / 12) * 5,
        ICON: 15.8 + Math.random() * 6.5 + Math.sin(i / 12) * 5,
      });
    }

    return data;
  };

  const forecastData = generateModelData();

  // Calculate model statistics
  const calculateStats = (model: string) => {
    const values = forecastData.map((d: any) => d[model] as number);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    return {
      mean: mean.toFixed(1),
      min: Math.min(...values).toFixed(1),
      max: Math.max(...values).toFixed(1),
      stdDev: stdDev.toFixed(2),
    };
  };

  const modelInfo: Record<string, {
    name: string;
    agency: string;
    resolution: string;
    update: string;
    color: string;
  }> = {
    GFS: {
      name: 'Global Forecast System',
      agency: 'NOAA/NCEP',
      resolution: '13 km',
      update: 'Every 6 hours',
      color: '#3b82f6',
    },
    NAM: {
      name: 'North American Mesoscale',
      agency: 'NOAA/NCEP',
      resolution: '12 km',
      update: 'Every 6 hours',
      color: '#ef4444',
    },
    HRRR: {
      name: 'High-Resolution Rapid Refresh',
      agency: 'NOAA/ESRL',
      resolution: '3 km',
      update: 'Every hour',
      color: '#10b981',
    },
    ECMWF: {
      name: 'European Centre Model',
      agency: 'ECMWF',
      resolution: '9 km',
      update: 'Twice daily',
      color: '#8b5cf6',
    },
    ICON: {
      name: 'ICOsahedral Nonhydrostatic',
      agency: 'DWD',
      resolution: '13 km',
      update: 'Every 6 hours',
      color: '#f59e0b',
    },
  };

  return (
    <div className="space-y-6">
      {/* Model Overview */}
      <div className="weather-card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          <span>Multi-Model Ensemble Forecast</span>
        </h2>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-6">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Comparing {models.length} weather models for {currentLocation?.name}. Model agreement indicates forecast confidence. Large spreads suggest uncertainty.
          </p>
        </div>

        {/* Model Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {models.map((model) => {
            const info = modelInfo[model];
            return (
              <div
                key={model}
                className="p-3 border-2 rounded-lg"
                style={{ borderColor: info.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-bold text-sm"
                    style={{ color: info.color }}
                  >
                    {model}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: info.color }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>{info.agency}</div>
                  <div>{info.resolution} resolution</div>
                  <div>{info.update}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Temperature Comparison Chart */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Temperature Forecast Comparison</span>
        </h3>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                label={{ value: `Temperature (${tempUnit})`, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
              <Legend />
              {models.map((model) => (
                <Line
                  key={model}
                  type="monotone"
                  dataKey={model}
                  stroke={modelInfo[model].color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Statistics */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Model Statistics (48-Hour Forecast)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Model</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Mean</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Min</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Max</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Std Dev</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Info</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => {
                const stats = calculateStats(model);
                const info = modelInfo[model];

                return (
                  <tr key={model} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: info.color }}
                        ></div>
                        <span className="font-semibold" style={{ color: info.color }}>
                          {model}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 text-gray-900 dark:text-white font-medium">
                      {stats.mean}{tempUnit}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                      {stats.min}{tempUnit}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                      {stats.max}{tempUnit}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                      ±{stats.stdDev}°
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500 dark:text-gray-500">
                      {info.resolution}, {info.update.toLowerCase()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ensemble Statistics */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Ensemble Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Model Agreement</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">High</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Models show good agreement, increasing forecast confidence
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Forecast Spread</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">±2.3°C</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Average deviation between models
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confidence Level</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">85%</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Based on historical model performance
            </div>
          </div>
        </div>
      </div>

      {/* Model Comparison Info */}
      <div className="weather-card bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
              Understanding Model Comparisons
            </h3>
            <div className="text-sm text-yellow-800 dark:text-yellow-300 space-y-2">
              <p><strong>When models agree:</strong> Higher confidence in the forecast. Weather changes likely to occur as predicted.</p>
              <p><strong>When models diverge:</strong> Lower confidence. Multiple scenarios possible. Check updates frequently.</p>
              <p><strong>High-resolution models (HRRR):</strong> Better for short-term, local forecasts. May be less accurate beyond 18 hours.</p>
              <p><strong>Global models (GFS, ECMWF):</strong> Better for extended forecasts and large-scale patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
