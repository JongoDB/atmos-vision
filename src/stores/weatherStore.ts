import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Location,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  WeatherAlert,
  AirQuality,
  MarineForecast,
  UserPreferences,
} from '../types/weather';

interface WeatherState {
  // Location management
  currentLocation: Location | null;
  favoriteLocations: Location[];
  setCurrentLocation: (location: Location) => void;
  addFavoriteLocation: (location: Location) => void;
  removeFavoriteLocation: (locationId: string) => void;
  toggleFavorite: (location: Location) => void;

  // Weather data
  currentWeather: CurrentWeather | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  weatherAlerts: WeatherAlert[];
  airQuality: AirQuality[];
  marineForecast: MarineForecast[];

  setCurrentWeather: (weather: CurrentWeather) => void;
  setHourlyForecast: (forecast: HourlyForecast[]) => void;
  setDailyForecast: (forecast: DailyForecast[]) => void;
  setWeatherAlerts: (alerts: WeatherAlert[]) => void;
  setAirQuality: (airQuality: AirQuality[]) => void;
  setMarineForecast: (marine: MarineForecast[]) => void;

  // User preferences
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;

  // UI state
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Dashboard customization
  activeWidgets: string[];
  toggleWidget: (widgetId: string) => void;
  reorderWidgets: (widgets: string[]) => void;

  // Navigation
  activeView: string;
  setActiveView: (view: string) => void;
}

const defaultPreferences: UserPreferences = {
  temperatureUnit: 'celsius',
  speedUnit: 'kmh',
  precipitationUnit: 'mm',
  pressureUnit: 'hpa',
  darkMode: false,
  favoriteLocations: [],
  enableNotifications: false,
  alertThresholds: {},
};

const defaultWidgets = [
  'current-conditions',
  'hourly-forecast',
  'daily-forecast',
  'radar',
  'alerts',
  'air-quality',
];

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      // Initial state
      currentLocation: null,
      favoriteLocations: [],
      currentWeather: null,
      hourlyForecast: [],
      dailyForecast: [],
      weatherAlerts: [],
      airQuality: [],
      marineForecast: [],
      preferences: defaultPreferences,
      isLoading: false,
      error: null,
      activeWidgets: defaultWidgets,
      activeView: 'overview',

      // Location actions
      setCurrentLocation: (location) => set({ currentLocation: location }),

      addFavoriteLocation: (location) =>
        set((state) => ({
          favoriteLocations: [...state.favoriteLocations, { ...location, isFavorite: true }],
        })),

      removeFavoriteLocation: (locationId) =>
        set((state) => ({
          favoriteLocations: state.favoriteLocations.filter((loc) => loc.id !== locationId),
        })),

      toggleFavorite: (location) =>
        set((state) => {
          const exists = state.favoriteLocations.find((loc) => loc.id === location.id);
          if (exists) {
            return {
              favoriteLocations: state.favoriteLocations.filter((loc) => loc.id !== location.id),
            };
          } else {
            return {
              favoriteLocations: [...state.favoriteLocations, { ...location, isFavorite: true }],
            };
          }
        }),

      // Weather data actions
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setHourlyForecast: (forecast) => set({ hourlyForecast: forecast }),
      setDailyForecast: (forecast) => set({ dailyForecast: forecast }),
      setWeatherAlerts: (alerts) => set({ weatherAlerts: alerts }),
      setAirQuality: (airQuality) => set({ airQuality: airQuality }),
      setMarineForecast: (marine) => set({ marineForecast: marine }),

      // Preferences actions
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),

      // UI state actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      // Widget management
      toggleWidget: (widgetId) =>
        set((state) => ({
          activeWidgets: state.activeWidgets.includes(widgetId)
            ? state.activeWidgets.filter((id) => id !== widgetId)
            : [...state.activeWidgets, widgetId],
        })),

      reorderWidgets: (widgets) => set({ activeWidgets: widgets }),

      // Navigation actions
      setActiveView: (view) => set({ activeView: view }),
    }),
    {
      name: 'atmosvision-storage',
      partialize: (state) => ({
        favoriteLocations: state.favoriteLocations,
        preferences: state.preferences,
        activeWidgets: state.activeWidgets,
        currentLocation: state.currentLocation,
        activeView: state.activeView,
      }),
    }
  )
);
