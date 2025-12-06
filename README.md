# AtmosVision Pro

<div align="center">

![AtmosVision Pro](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows%20%7C%20macOS-lightgrey.svg)

**Advanced open-source meteorological forecasting platform**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Building](#building) • [Contributing](#contributing)

</div>

---

## Overview

AtmosVision Pro is a free, open-source desktop application for professional-grade weather forecasting and analysis. Built with modern web technologies and powered by free weather APIs, it provides comprehensive meteorological data without any subscription costs.

## Features

### 📊 Core Features
- **Current Conditions** - Real-time weather data with detailed atmospheric parameters
- **48-Hour Forecast** - Hourly breakdown with temperature, precipitation, and wind
- **16-Day Forecast** - Extended daily forecasts with high/low temps and conditions
- **Live Weather Radar** - Real-time precipitation radar powered by RainViewer
- **Weather Alerts** - Active alerts and warnings (US locations via NOAA/NWS)
- **Air Quality Monitoring** - AQI and pollutant levels
- **Marine Forecast** - Wave height, period, and ocean current data

### 🔧 Advanced Features
- **Atmospheric Data** - Convective parameters, CAPE, helicity, and severe weather indices
- **Model Comparison** - View multiple weather model forecasts
- **Historical Data** - Access past weather data and climate normals
- **Favorite Locations** - Save and quickly switch between locations
- **Dark Mode** - Full dark theme support
- **Unit Conversion** - Switch between metric and imperial units

### 🌍 Data Sources (100% Free)
- **OpenMeteo API** - Primary forecast data
- **RainViewer** - Live radar imagery
- **NOAA/NWS** - US weather alerts
- **OpenMeteo Marine API** - Ocean and coastal forecasts
- **OpenMeteo Air Quality API** - Air quality indices

## Installation

### Linux

**Debian/Ubuntu (DEB)**
```bash
# Download the .deb file from releases
sudo dpkg -i AtmosVision-Pro-0.1.0-amd64.deb

# Or using apt
sudo apt install ./AtmosVision-Pro-0.1.0-amd64.deb
```

**RedHat/Fedora (RPM)**
```bash
# Download the .rpm file from releases
sudo rpm -i AtmosVision-Pro-0.1.0-x86_64.rpm

# Or using dnf
sudo dnf install ./AtmosVision-Pro-0.1.0-x86_64.rpm
```

### Windows

1. Download `AtmosVision-Pro-0.1.0-Setup.exe` from the [releases page](https://github.com/JongoDB/atmos-vision/releases)
2. Run the installer
3. Follow the installation wizard
4. Launch from Start Menu or Desktop shortcut

### macOS

1. Download `AtmosVision-Pro-0.1.0.dmg` from the [releases page](https://github.com/JongoDB/atmos-vision/releases)
2. Open the DMG file
3. Drag AtmosVision Pro to Applications folder
4. Launch from Applications

## Usage

### Getting Started

1. **Launch the application**
2. **Search for a location** using the search bar
3. **Add to favorites** (star icon) for quick access
4. **Explore different views** using the sidebar navigation

### Navigation

- **Overview** - Current conditions, alerts, and hourly forecast
- **Forecast** - Detailed 48-hour and 16-day forecasts
- **Radar** - Live precipitation radar
- **Alerts** - Active weather warnings
- **Atmospheric Data** - Advanced convective parameters
- **Marine** - Ocean and coastal forecasts
- **Air Quality** - Pollution levels and AQI

### Settings

- **Units Toggle** - Switch between Celsius/Fahrenheit, km/h/mph, etc.
- **Dark Mode** - Toggle dark theme
- **Location Search** - Search and save favorite locations

## Building from Source

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Development

```bash
# Clone the repository
git clone https://github.com/JongoDB/atmos-vision.git
cd atmos-vision

# Install dependencies
npm install

# Run development server (web)
npm run dev

# Run Electron app in development
npm run electron:dev
```

### Production Builds

```bash
# Build for current platform
npm run electron:build

# Build for specific platforms
npm run electron:build:linux   # Linux (DEB, RPM)
npm run electron:build:win     # Windows (EXE)
npm run electron:build:mac     # macOS (DMG)
```

Builds will be output to the `release/` directory.

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Desktop**: Electron
- **Build**: Vite
- **State Management**: Zustand
- **Charts**: Recharts
- **Maps**: React Leaflet

## API Rate Limits

All APIs used are free tier:
- **OpenMeteo**: No API key required, unlimited requests
- **RainViewer**: Free, no API key required
- **NOAA/NWS**: Free public API, no key required

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [OpenMeteo](https://open-meteo.com/)
- Radar imagery by [RainViewer](https://www.rainviewer.com/)
- US weather alerts from [NOAA/NWS](https://www.weather.gov/)
- Map tiles by [OpenStreetMap](https://www.openstreetmap.org/)

## Support

- **Issues**: [GitHub Issues](https://github.com/JongoDB/atmos-vision/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JongoDB/atmos-vision/discussions)

---

<div align="center">
Made with ❤️ for weather enthusiasts everywhere
</div>
