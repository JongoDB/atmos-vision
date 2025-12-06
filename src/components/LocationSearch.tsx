import { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import { searchLocation } from '../services/openMeteoApi';
import { useWeatherStore } from '../stores/weatherStore';
import type { Location } from '../types/weather';

interface LocationSearchProps {
  onLocationSelect?: () => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps = {}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { setCurrentLocation, favoriteLocations, toggleFavorite } = useWeatherStore();

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const locations = await searchLocation(searchQuery);
      setResults(locations);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (result: any) => {
    const location: Location = {
      id: `${result.latitude},${result.longitude}`,
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone,
      elevation: result.elevation,
      country: result.country,
      state: result.admin1,
      isFavorite: false,
    };

    setCurrentLocation(location);
    setQuery('');
    setResults([]);

    // Call the callback if provided
    if (onLocationSelect) {
      onLocationSelect();
    }
  };

  const handleSelectFavorite = (location: Location) => {
    setCurrentLocation(location);

    // Call the callback if provided
    if (onLocationSelect) {
      onLocationSelect();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search for a city or location..."
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
        />
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto custom-scrollbar">
          {results.map((result, index) => {
            const resultId = `${result.latitude},${result.longitude}`;
            const isFavorite = favoriteLocations.some(fav => fav.id === resultId);

            return (
              <div
                key={index}
                className="flex items-center border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <button
                  onClick={() => handleSelectLocation(result)}
                  className="flex-1 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {result.name}
                          {result.admin1 && `, ${result.admin1}`}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {result.country}
                          {result.elevation && ` • ${result.elevation}m elevation`}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {result.latitude.toFixed(2)}°, {result.longitude.toFixed(2)}°
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    const location: Location = {
                      id: resultId,
                      name: result.name,
                      latitude: result.latitude,
                      longitude: result.longitude,
                      timezone: result.timezone,
                      elevation: result.elevation,
                      country: result.country,
                      state: result.admin1,
                      isFavorite: false,
                    };
                    toggleFavorite(location);
                  }}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFavorite
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {isSearching && (
        <div className="mt-2 text-center text-gray-500 dark:text-gray-400">
          Searching...
        </div>
      )}

      {/* Favorite Locations */}
      {favoriteLocations.length > 0 && !query && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
            <Star className="w-4 h-4 mr-2 fill-yellow-500 text-yellow-500" />
            Favorite Locations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {favoriteLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <button
                  onClick={() => handleSelectFavorite(location)}
                  className="flex-1 px-4 py-3 text-left"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{location.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {location.state && `${location.state}, `}
                    {location.country}
                  </div>
                </button>
                <button
                  onClick={() => toggleFavorite(location)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                  title="Remove from favorites"
                >
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 hover:fill-none hover:text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
