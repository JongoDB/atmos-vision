import {
  Cloud,
  CloudRain,
  Wind,
  Waves,
  Radar,
  AlertTriangle,
  Activity,
  BarChart3,
  Database,
  Star,
  Search,
} from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';

interface SidebarProps {
  onSearchClick?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: 'primary' | 'data' | 'analysis';
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <Cloud className="w-5 h-5" />, category: 'primary' },
  { id: 'forecast', label: 'Forecast', icon: <CloudRain className="w-5 h-5" />, category: 'primary' },
  { id: 'radar', label: 'Radar', icon: <Radar className="w-5 h-5" />, category: 'primary' },
  { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-5 h-5" />, category: 'primary' },

  { id: 'atmospheric', label: 'Atmospheric Data', icon: <Activity className="w-5 h-5" />, category: 'data' },
  { id: 'marine', label: 'Marine', icon: <Waves className="w-5 h-5" />, category: 'data' },
  { id: 'air-quality', label: 'Air Quality', icon: <Wind className="w-5 h-5" />, category: 'data' },

  { id: 'models', label: 'Model Comparison', icon: <BarChart3 className="w-5 h-5" />, category: 'analysis' },
  { id: 'historical', label: 'Historical Data', icon: <Database className="w-5 h-5" />, category: 'analysis' },
];

export default function Sidebar({ onSearchClick }: SidebarProps = {}) {
  const { activeView, setActiveView } = useWeatherStore();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-[73px] bottom-0 overflow-y-auto custom-scrollbar">
      <nav className="p-4 space-y-6">
        {/* Search Locations & Favorites */}
        <div className="space-y-2">
          <button
            onClick={onSearchClick}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Search Location</span>
          </button>

          <button
            onClick={onSearchClick}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="View and manage your favorite locations"
          >
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm">My Favorites</span>
          </button>
        </div>

        {/* Primary Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4">
            Primary
          </h3>
          <ul className="space-y-1">
            {navItems
              .filter((item) => item.category === 'primary')
              .map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Data Sources */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4">
            Data
          </h3>
          <ul className="space-y-1">
            {navItems
              .filter((item) => item.category === 'data')
              .map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Analysis Tools */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-4">
            Analysis
          </h3>
          <ul className="space-y-1">
            {navItems
              .filter((item) => item.category === 'analysis')
              .map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 text-xs text-gray-500 dark:text-gray-400">
            <p className="font-semibold mb-1">Data Sources:</p>
            <ul className="space-y-1">
              <li>• Open-Meteo API</li>
              <li>• NOAA/NWS</li>
              <li>• Multiple Weather Models</li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  );
}
