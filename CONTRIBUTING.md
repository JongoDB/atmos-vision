# Contributing to AtmosVision Pro

Thank you for your interest in contributing to AtmosVision Pro! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/JongoDB/atmos-vision/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your OS and app version

### Suggesting Features

1. Check [existing feature requests](https://github.com/JongoDB/atmos-vision/issues?q=is%3Aissue+label%3Aenhancement)
2. Create a new issue with:
   - Clear description of the feature
   - Use case / problem it solves
   - Proposed implementation (optional)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run dev          # Test in browser
   npm run electron:dev # Test Electron app
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add brief description of changes"
   ```
   - Use clear, concise commit messages
   - Start with a verb (Add, Fix, Update, Remove)
   - Keep commits focused and atomic

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Include screenshots for UI changes

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/atmos-vision.git
cd atmos-vision

# Add upstream remote
git remote add upstream https://github.com/JongoDB/atmos-vision.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Keeping Your Fork Updated
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## Code Style

- **TypeScript**: Use types, avoid `any`
- **Components**: Functional components with hooks
- **Formatting**: Consistent indentation and spacing
- **Naming**:
  - Components: PascalCase (`WeatherWidget`)
  - Functions: camelCase (`fetchWeatherData`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

## Project Structure

```
src/
├── components/       # React components
│   ├── layout/      # Layout components
│   └── widgets/     # Weather widgets
├── hooks/           # Custom React hooks
├── services/        # API services
├── stores/          # Zustand state management
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Testing

Before submitting a PR:
- Test on your target platform (Linux/Windows/macOS)
- Verify all features work as expected
- Check for console errors
- Test light and dark modes
- Test with different locations

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public functions
- Update CONTRIBUTING.md for process changes

## Questions?

- Open a [Discussion](https://github.com/JongoDB/atmos-vision/discussions)
- Comment on related issues
- Check existing documentation

Thank you for contributing! 🎉
