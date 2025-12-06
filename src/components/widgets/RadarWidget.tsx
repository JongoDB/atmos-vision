import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useWeatherStore } from '../../stores/weatherStore';
import 'leaflet/dist/leaflet.css';
import { Radar } from 'lucide-react';

export default function RadarWidget() {
  const { currentLocation } = useWeatherStore();
  const [radarTimestamp, setRadarTimestamp] = useState<number>(0);
  const [opacity, setOpacity] = useState(0.6);

  // Fetch available radar timestamps from RainViewer API
  useEffect(() => {
    const fetchRadarTimestamps = async () => {
      try {
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const data = await response.json();
        if (data.radar && data.radar.past && data.radar.past.length > 0) {
          // Use the most recent radar image
          setRadarTimestamp(data.radar.past[data.radar.past.length - 1].time);
        }
      } catch (error) {
        console.error('Error fetching radar timestamps:', error);
      }
    };

    fetchRadarTimestamps();
    // Refresh radar data every 10 minutes
    const interval = setInterval(fetchRadarTimestamps, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!currentLocation) return null;

  // RainViewer radar tile URL (completely free, no API key needed)
  const radarUrl = radarTimestamp
    ? `https://tilecache.rainviewer.com/v2/radar/${radarTimestamp}/256/{z}/{x}/{y}/2/1_1.png`
    : '';

  return (
    <div className="weather-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Radar className="w-6 h-6 text-blue-500" />
          <span>Weather Radar</span>
        </h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Opacity:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity * 100}
              onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
              className="w-20"
            />
            <span className="text-xs font-medium text-gray-900 dark:text-white w-8">
              {Math.round(opacity * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <MapContainer
          center={[currentLocation.latitude, currentLocation.longitude]}
          zoom={8}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* RainViewer Radar Layer - Free, no API key required */}
          {radarUrl && (
            <TileLayer
              url={radarUrl}
              opacity={opacity}
              attribution='&copy; <a href="https://www.rainviewer.com/">RainViewer</a>'
            />
          )}

          <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{currentLocation.name}</div>
                <div className="text-xs text-gray-600">
                  {currentLocation.latitude.toFixed(4)}°, {currentLocation.longitude.toFixed(4)}°
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Light</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Moderate</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Heavy</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Severe</span>
        </div>
      </div>

      {radarTimestamp && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-blue-800 dark:text-blue-300">
          <strong>Live Radar:</strong> Powered by RainViewer - Updated {new Date(radarTimestamp * 1000).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
