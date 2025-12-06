import { useEffect, useState } from 'react';
import { useWeatherStore } from './stores/weatherStore';
import { useWeatherData } from './hooks/useWeatherData';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import LocationSearch from './components/LocationSearch';

function App() {
  const { currentLocation, preferences } = useWeatherStore();
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  // Initialize weather data fetching
  useWeatherData();

  // Apply dark mode preference
  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header onSearchClick={() => setShowLocationSearch(true)} />

      <div className="flex">
        <Sidebar onSearchClick={() => setShowLocationSearch(true)} />

        <main className="flex-1 p-6 ml-64 overflow-x-hidden">
          {!currentLocation ? (
            <div className="max-w-2xl mx-auto mt-20">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to AtmosVision Pro
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Professional-grade meteorological forecasting platform
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  Search for a location to get started
                </p>
              </div>
              <LocationSearch onLocationSelect={() => setShowLocationSearch(false)} />
            </div>
          ) : (
            <Dashboard />
          )}
        </main>
      </div>

      {/* Shared Location Search Modal */}
      {showLocationSearch && currentLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Search Location & Favorites
              </h2>
              <button
                onClick={() => setShowLocationSearch(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <LocationSearch onLocationSelect={() => setShowLocationSearch(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
