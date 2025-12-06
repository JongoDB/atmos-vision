# AtmosVision Pro - Quick Start Guide

## 🚀 Get Started in 60 Seconds

### 1. Start the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 2. Search for Your Location

- Click in the search box on the welcome screen
- Type any city name (e.g., "New York", "London", "Tokyo")
- Click on a result from the dropdown

### 3. Explore Your Weather Dashboard

You'll immediately see:
- **Current conditions** with temperature, wind, humidity
- **48-hour forecast** with precipitation probability
- **16-day extended forecast**
- **Air quality index** with pollutant levels
- **Weather alerts** (if any are active)
- **Interactive radar map**

### 4. Save Favorite Locations

- Search for additional locations
- Click the star icon to save them
- Quickly switch between favorites

### 5. Toggle Dark Mode

- Click the moon/sun icon in the top-right corner
- Your preference is automatically saved

## 📱 Key Features

| Feature | Description |
|---------|-------------|
| **Real-time Weather** | Current conditions updated every 10 minutes |
| **48-Hour Forecast** | Detailed hourly breakdown with precipitation |
| **16-Day Forecast** | Extended daily forecasts |
| **Weather Alerts** | Severe weather warnings (US locations) |
| **Air Quality** | AQI and pollutant concentrations |
| **Interactive Map** | Radar overlay and location marker |
| **Global Coverage** | Search any location worldwide |
| **Dark Mode** | Eye-friendly dark theme |
| **Persistent Data** | Your settings and favorites are saved |

## 🎯 Pro Tips

### Understanding the Data

**Current Conditions Widget:**
- Large temperature = actual temperature
- "Feels like" = apparent temperature (heat index or wind chill)
- Comfort Level = based on dew point
- UV Index = color-coded for safety

**Hourly Forecast:**
- Scroll horizontally to see all 48 hours
- Blue bars = precipitation probability
- Higher bar = more likely to rain/snow

**Daily Forecast:**
- Click "Today" for expanded details (sunrise, sunset, UV index)
- Temperature range shows daily high/low
- Precipitation percentage and amounts

**Air Quality:**
- Green (0-50) = Good
- Yellow (51-100) = Moderate
- Orange (101-150) = Unhealthy for sensitive groups
- Red (151+) = Unhealthy

**Weather Alerts:**
- Red border = Extreme/Severe
- Orange = Moderate
- Read instructions carefully for safety guidance

### Best Practices

1. **Update Frequency**: Data refreshes automatically every 10 minutes
2. **Multiple Locations**: Save favorites for quick access
3. **Alert Monitoring**: Check alerts widget for severe weather
4. **Air Quality**: Sensitive individuals should monitor AQI daily
5. **Marine Areas**: Coastal locations get wave/swell forecasts

## 🔧 Customization

### Change Units (Coming Soon)
The app will support:
- Temperature: °C or °F
- Wind: km/h, mph, m/s, knots
- Precipitation: mm or inches
- Pressure: hPa, mb, inHg

Currently defaults to:
- Celsius
- km/h
- millimeters
- hPa

### Widget Management (Coming Soon)
- Show/hide widgets
- Drag to reorder
- Create custom layouts

## 🌐 Supported Locations

**Worldwide Coverage:**
- Any city with population > 1,000
- Latitude/longitude coordinates
- Automatic timezone detection
- Elevation data

**Enhanced Features for US Locations:**
- NOAA weather alerts
- Detailed warnings/watches
- Local NWS forecasts

## 📊 Data Sources

All data is free and open-source:
- **Open-Meteo**: Weather forecasts, air quality
- **NOAA/NWS**: US weather alerts
- **OpenStreetMap**: Map tiles

No API keys required!

## 🆘 Troubleshooting

### Location Not Found
- Try the country/state (e.g., "Paris, France")
- Check spelling
- Try nearby larger city

### No Weather Data
- Check internet connection
- Try refreshing the page
- API might be temporarily down (rare)

### No Alerts Showing
- Alerts are US-only
- "No Active Alerts" means all clear! 👍

### Dark Mode Not Working
- Clear browser cache
- Try toggling off and on
- Check browser supports dark mode CSS

## 🏗️ Building for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview

# Deploy the 'dist' folder to any static host
```

## 📱 Mobile Usage

The app is fully responsive:
- Works on phones and tablets
- Touch-friendly controls
- Optimized layouts for small screens

**Install as PWA (Future):**
- Add to home screen from browser
- Works offline (coming soon)
- Native app experience

## 🎓 Learning Mode

### Understanding Weather Terms

**Dew Point:**
- Temperature at which air becomes saturated
- Higher = more humid/uncomfortable
- 10-13°C = comfortable
- 20°C+ = very humid

**Apparent Temperature:**
- What it "feels like"
- Accounts for humidity and wind
- Can be very different from actual temp

**Barometric Pressure:**
- Rising pressure = improving weather
- Falling pressure = approaching storm
- 1013 hPa = standard sea level

**UV Index:**
- 0-2 = Low (no protection needed)
- 3-5 = Moderate (protection recommended)
- 6-7 = High (protection required)
- 8-10 = Very high (extra protection)
- 11+ = Extreme (avoid sun)

**Wind Direction:**
- Shows where wind is coming FROM
- N = wind from the north
- Arrows point the direction wind blows

## 🔮 Coming Soon

- Advanced atmospheric analysis (Skew-T diagrams)
- Multi-model ensemble forecasting
- Historical weather comparison
- Data export (CSV, JSON)
- Custom alert thresholds
- Aviation weather (METAR/TAF)
- Marine forecasts expansion
- Satellite imagery
- Offline mode
- Desktop app (Electron)

## 💬 Feedback & Support

Found a bug? Want a feature? Have questions?
- Open an issue on GitHub
- Check the README.md for detailed info
- Read DEVELOPMENT.md for technical details

---

**Enjoy exploring the atmosphere! 🌦️⚡🌈**
