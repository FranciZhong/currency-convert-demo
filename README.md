# Currency Converter Demo

A Next.js application for currency conversion with real-time exchange rates.

## API Issue

The provided API key hit the monthly quate limit. Hence, I use mocked data (random) for exchange rate trend instead of using the time-series API.

## Prerequisites

- Docker and Docker Compose
- Port 3000 available
- Node.js 20 or later and pnpm for local development

## Environment Setup

Create a `.env` file or remove `.example` from `.env.example` in the root directory with the following variables:

```
OPEN_EXCHANGE_RATES_API_KEY=your_api_key
OPEN_EXCHANGE_RATES_API_URL=https://openexchangerates.org/api
```

## Running with Docker

1. Build the Docker image:

```bash
docker build -t currency-convert-demo .
```

2. Start the application:

```bash
docker compose up
```

The application will be available at http://localhost:3000

## Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm typecheck` - Run TypeScript type checking

## Screenshots

Screenshots can be found under `/screenshot` folder.
