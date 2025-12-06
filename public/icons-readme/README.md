# AtmosVision Pro Icons

This directory should contain application icons for different platforms:

## Required Icons:

### Windows
- **icon.ico** - Windows icon file (256x256, 128x128, 64x64, 48x48, 32x32, 16x16)

### macOS
- **icon.icns** - macOS icon file (512x512@2x, 512x512, 256x256@2x, 256x256, 128x128@2x, 128x128, 32x32@2x, 32x32, 16x16@2x, 16x16)

### Linux
- **icon.png** - PNG icons in various sizes
  - 16x16.png
  - 32x32.png
  - 48x48.png
  - 64x64.png
  - 128x128.png
  - 256x256.png
  - 512x512.png
  - 1024x1024.png

## Icon Design Guidelines:

The AtmosVision Pro icon should represent:
- Weather/meteorology theme
- Professional, modern design
- Clear at small sizes (16x16)
- Scalable vector source recommended

## Generating Icons:

You can use tools like:
- **electron-icon-builder** - `npm install -g electron-icon-builder`
- **png2icons** - Convert PNG to ICO/ICNS
- Online tools like **iConvert Icons**

## Temporary Solution:

For development/testing, you can use placeholder icons or skip icon configuration.
The app will build successfully without icons, but will use default Electron icons.
