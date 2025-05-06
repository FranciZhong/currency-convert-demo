interface CurrencyRates {
  base: string;
  rates: {
    [key: string]: number;
  };
}

interface CurrencySymbol {
  currency: string;
  currencyUnit: string;
}

interface CurrencyTimeseries {
  base: string;
  currency: string;
  startDate: string;
  endDate: string;
  // Date to rate
  rates: {
    [key: string]: number;
  };
}

const CURRENCY_SHORTS = ["AUD", "USD", "EUR", "GBP", "CAD", "NZD"];

const BASE_CURRENCY_SYMBOL: CurrencySymbol = {
  currency: "AUD",
  currencyUnit: "$",
};

const CURRENCY_SYMBOLS: CurrencySymbol[] = [
  {
    currency: "USD",
    currencyUnit: "$",
  },
  {
    currency: "EUR",
    currencyUnit: "€",
  },
  {
    currency: "GBP",
    currencyUnit: "£",
  },
  {
    currency: "CAD",
    currencyUnit: "$",
  },
  {
    currency: "NZD",
    currencyUnit: "$",
  },
];

export { BASE_CURRENCY_SYMBOL, CURRENCY_SHORTS, CURRENCY_SYMBOLS };
export type { CurrencyRates, CurrencySymbol, CurrencyTimeseries };
