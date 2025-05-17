# WeatherWizard 🌤️

A modern weather application built with Next.js, TypeScript, and Zustand. WeatherWizard provides real-time weather information, forecasts, and interactive weather maps with a beautiful and intuitive user interface.

## 📦 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: SCSS (Sass)
- **State Management**: Zustand
- **API Integration**: OpenWeatherMap API
- **Testing**: Jest & React Testing Library

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Sardar-Atabekov/WeatherWizard.git
   cd WeatherWizard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:

   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```bash
src/
├── app/              # App initialization, routes, global providers
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── pages/            # Next.js pages
├── widgets/          # UI blocks combining entities and features
│   └── WeatherCard/  # Weather information display
├── features/         # Functional modules
│   ├── weather/      # Weather data fetching and processing
├── entities/         # Business entities
│   └── Weather/      # Weather data models and components
├── shared/
│   ├── ui/           # Reusable UI components
│   │   ├── Button/   # Custom button component
│   │   └── Input/    # Custom input component
│   ├── lib/          # Utilities and helpers
│   ├── config/       # Configuration files
│   └── types/        # TypeScript type definitions
├── .eslintrc.js      # ESLint configuration
├── .gitignore        # Git ignore rules
├── next.config.js    # Next.js configuration
├── package.json      # Project dependencies
└── tsconfig.json     # TypeScript configuration
```

## ⚙️ Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build production bundle
- `npm run start` — Start production server
- `npm run test` — Run tests
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

## 🧪 Testing

The project uses Jest and React Testing Library for testing. Run tests with:

```bash
npm run test
```

## 🔧 Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

## 📝 Features

- Real-time weather updates
- 5-day weather forecast
- Interactive weather maps
- Location-based weather search
<!-- - Dark/Light theme support -->
- Responsive design
- Unit tests

## 👨‍💻 Author

[Sardar Atabekov](https://github.com/Sardar-Atabekov)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and TypeScript
