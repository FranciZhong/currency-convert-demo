import { CURRENCY_SHORTS, CurrencyRates } from "@/lib/currency";

// Open Exchange Rates API
const API_BASE_URL =
  process.env.OPEN_EXCHANGE_RATES_API_URL ||
  "https://openexchangerates.org/api";
const API_KEY = process.env.OPEN_EXCHANGE_RATES_API_KEY;

// Simplify the symbols to only the ones we want
const SYMBOLS = CURRENCY_SHORTS.join(",");

if (!API_KEY) {
  throw new Error("OPEN_EXCHANGE_RATES_API_KEY is not defined");
}

/**
 * Fetches the latest currency exchange rates
 * USD is the default base currency for Open Exchange Rates API
 */
export const getLatestRates = async (
  base = "USD",
  symbols = SYMBOLS
): Promise<CurrencyRates> => {
  const response = await fetch(
    `${API_BASE_URL}/latest.json?app_id=${API_KEY}&base=${base}&symbols=${symbols}`,
    {
      // Cache for 1 hour
      next: {
        revalidate: 3600,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch latest rates: ${response.statusText}`);
  }

  const data = await response.json();

  // Using AUD as base currency
  // Do calculation cause API returns rates in USD cause of the API key issue
  const rateAUD = data.rates.AUD;
  const convertedRates: CurrencyRates = {
    base: "AUD",
    rates: Object.fromEntries(
      CURRENCY_SHORTS.map((short) => [short, data.rates[short] / rateAUD])
    ),
  };

  return convertedRates;
};

/**
 * Fetches time series of exchange rates for a time period
 * USD is the default base currency for Open Exchange Rates API
 */
export const getTimeSeriesRates = async (
  startDate: string,
  endDate: string,
  base = "USD",
  symbols = SYMBOLS
): Promise<{
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}> => {
  const response = await fetch(
    `${API_BASE_URL}/time-series.json?app_id=${API_KEY}&base=${base}&start=${startDate}&end=${endDate}&symbols=${symbols}`,
    {
      // Cache for 24 hours
      next: {
        revalidate: 24 * 3600,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch time series rates: ${response.statusText}`
    );
  }

  return response.json();
};
