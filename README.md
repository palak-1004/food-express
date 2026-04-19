# Food Express 🍕🍔🍟

A modern food delivery application built with React, TypeScript, and Vite. Order your favorite meals from local restaurants with real-time location services and seamless cart management.

## Features

- 🔐 User Authentication
- 📍 Location-based Restaurant Discovery
- 🗺️ Interactive Maps with Google Maps & Leaflet
- 🛒 Shopping Cart with Real-time Updates
- 🍽️ Restaurant Details & Menu Browsing
- 📂 Category-based Food Filtering
- 👤 User Profile Management
- ❓ Help & Support Page

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Backend**: Supabase
- **Maps**: Google Maps API, Leaflet, React Places Autocomplete
- **Styling**: CSS Modules
- **Build Tool**: Vite
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account for backend services

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd food-express
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
food-express/
├── public/
│   └── imgs/                 # Static images
├── src/
│   ├── api/                  # API integration
│   ├── component/            # Reusable UI components
│   ├── lib/                  # Utility libraries (Supabase client)
│   ├── Pages/                # Page components
│   ├── services/             # Business logic services
│   ├── styles/               # CSS stylesheets
│   ├── types/                # TypeScript type definitions
│   ├── App.tsx               # Main app component
│   └── main.tsx              # App entry point
├── package.json
├── vite.config.ts
└── README.md
```

## Key Components

- **Authentication**: Login system with user management
- **Location Services**: Google Places autocomplete for address selection
- **Restaurant Discovery**: Browse restaurants by location and categories
- **Cart Management**: Add/remove items with persistent cart state
- **Maps Integration**: Interactive maps for restaurant locations

