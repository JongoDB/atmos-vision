import { Moon, Sun, Search } from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';

interface HeaderProps {
  onSearchClick?: () => void;
}

export default function Header({ onSearchClick }: HeaderProps = {}) {
  const { currentLocation, preferences, updatePreferences } = useWeatherStore();

  const toggleDarkMode = () => {
    updatePreferences({ darkMode: !preferences.darkMode });
  };

  const toggleUnits = () => {
    const isMetric = preferences.temperatureUnit === 'celsius';
    updatePreferences({
      temperatureUnit: isMetric ? 'fahrenheit' : 'celsius',
      speedUnit: isMetric ? 'mph' : 'kmh',
      precipitationUnit: isMetric ? 'inch' : 'mm',
      pressureUnit: isMetric ? 'inhg' : 'hpa',
    });
  };

  const isMetric = preferences.temperatureUnit === 'celsius';

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌦️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  AtmosVision Pro
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Advanced Meteorological Forecasting
                </p>
              </div>
            </div>
          </div>

          {/* Current Location */}
          {currentLocation && (
            <div className="flex-1 text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Location</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentLocation.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {currentLocation.latitude.toFixed(4)}°, {currentLocation.longitude.toFixed(4)}°
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Location Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Search location"
              title="Search for a location"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Units Toggle */}
            <button
              onClick={toggleUnits}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle units"
              title={`Switch to ${isMetric ? 'Imperial' : 'Metric'} units`}
            >
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {isMetric ? '°C' : '°F'}
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
              title={`Switch to ${preferences.darkMode ? 'Light' : 'Dark'} mode`}
            >
              {preferences.darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
