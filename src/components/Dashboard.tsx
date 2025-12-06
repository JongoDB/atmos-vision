import { useWeatherStore } from '../stores/weatherStore';
import CurrentConditionsWidget from './widgets/CurrentConditionsWidget';
import HourlyForecastWidget from './widgets/HourlyForecastWidget';
import DailyForecastWidget from './widgets/DailyForecastWidget';
import WeatherAlertsWidget from './widgets/WeatherAlertsWidget';
import AirQualityWidget from './widgets/AirQualityWidget';
import RadarWidget from './widgets/RadarWidget';
import MarineForecastWidget from './widgets/MarineForecastWidget';
import AtmosphericDataWidget from './widgets/AtmosphericDataWidget';
import ModelComparisonWidget from './widgets/ModelComparisonWidget';
import HistoricalDataWidget from './widgets/HistoricalDataWidget';
import LoadingSpinner from './LoadingSpinner';

export default function Dashboard() {
  const { isLoading, error, activeWidgets, activeView } = useWeatherStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
          Error Loading Weather Data
        </h3>
        <p className="text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  // Render different views based on activeView
  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {activeWidgets.includes('current-conditions') && <CurrentConditionsWidget />}
            </div>
            {activeWidgets.includes('alerts') && <WeatherAlertsWidget />}
            <div className="grid grid-cols-1 gap-6">
              {activeWidgets.includes('hourly-forecast') && <HourlyForecastWidget />}
            </div>
          </div>
        );

      case 'forecast':
        return (
          <div className="space-y-6 overflow-x-hidden">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Forecast</h2>
            <HourlyForecastWidget />
            <DailyForecastWidget />
          </div>
        );

      case 'radar':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Radar</h2>
            <RadarWidget />
          </div>
        );

      case 'alerts':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Alerts</h2>
            <WeatherAlertsWidget />
          </div>
        );

      case 'atmospheric':
        return <AtmosphericDataWidget />;

      case 'marine':
        return <MarineForecastWidget />;

      case 'air-quality':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Air Quality</h2>
            <AirQualityWidget />
          </div>
        );

      case 'models':
        return <ModelComparisonWidget />;

      case 'historical':
        return <HistoricalDataWidget />;

      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {activeWidgets.includes('current-conditions') && <CurrentConditionsWidget />}
            </div>
            {activeWidgets.includes('alerts') && <WeatherAlertsWidget />}
            <div className="grid grid-cols-1 gap-6">
              {activeWidgets.includes('hourly-forecast') && <HourlyForecastWidget />}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeWidgets.includes('air-quality') && <AirQualityWidget />}
              {activeWidgets.includes('radar') && <RadarWidget />}
            </div>
          </div>
        );
    }
  };

  return <div className="space-y-6 overflow-x-hidden">{renderView()}</div>;
}
