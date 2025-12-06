import { AlertTriangle, AlertCircle, Info, Clock, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useWeatherStore } from '../../stores/weatherStore';
import type { WeatherAlert } from '../../types/weather';

export default function WeatherAlertsWidget() {
  const { weatherAlerts } = useWeatherStore();

  if (!weatherAlerts || weatherAlerts.length === 0) {
    return (
      <div className="weather-card bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-3">
          <Info className="w-6 h-6 text-green-600 dark:text-green-500" />
          <div>
            <h2 className="text-lg font-semibold text-green-900 dark:text-green-200">
              No Active Alerts
            </h2>
            <p className="text-sm text-green-700 dark:text-green-300">
              There are currently no weather alerts for this location.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: WeatherAlert['severity']) => {
    switch (severity) {
      case 'Extreme':
        return 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600 text-red-900 dark:text-red-200';
      case 'Severe':
        return 'bg-orange-100 dark:bg-orange-900/30 border-orange-500 dark:border-orange-600 text-orange-900 dark:text-orange-200';
      case 'Moderate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 dark:border-yellow-600 text-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 dark:border-blue-600 text-blue-900 dark:text-blue-200';
    }
  };

  const getSeverityIcon = (severity: WeatherAlert['severity']) => {
    switch (severity) {
      case 'Extreme':
      case 'Severe':
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return <AlertCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <span>Active Weather Alerts ({weatherAlerts.length})</span>
      </h2>

      {weatherAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getSeverityIcon(alert.severity)}
            </div>

            <div className="flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg">{alert.event}</h3>
                  <p className="text-sm font-semibold mt-1">{alert.headline}</p>
                </div>
                <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs font-semibold">
                  {alert.severity}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>{alert.areaDesc}</span>
              </div>

              {/* Time Information */}
              <div className="flex items-center space-x-4 text-sm mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    Onset: {format(parseISO(alert.onset), 'MMM d, h:mm a')}
                  </span>
                </div>
                <div>
                  Expires: {format(parseISO(alert.expires), 'MMM d, h:mm a')}
                </div>
              </div>

              {/* Description */}
              <div className="text-sm leading-relaxed mb-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                {alert.description}
              </div>

              {/* Instructions */}
              {alert.instruction && (
                <div className="text-sm font-semibold p-3 bg-white/70 dark:bg-gray-800/70 rounded border-l-2 border-current">
                  <div className="text-xs uppercase tracking-wide mb-1">Instructions:</div>
                  {alert.instruction}
                </div>
              )}

              {/* Metadata */}
              <div className="flex items-center space-x-4 mt-3 text-xs">
                <span>Urgency: {alert.urgency}</span>
                <span>Certainty: {alert.certainty}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
