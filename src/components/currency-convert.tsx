"use client";

import {
  BASE_CURRENCY_SYMBOL,
  CURRENCY_SYMBOLS,
  CurrencyRates,
} from "@/lib/currency";
import { useCallback, useState } from "react";
import CurrencyCard from "./currency-card";
import TimeseriesDialog from "./timeseries-dialog";
import ValueDialog from "./value-dialog";

export default function CurrencyConvert({
  latestRates,
}: {
  latestRates: CurrencyRates;
}) {
  const [value, setValue] = useState(1000.0);

  const handleValueChange = useCallback((value: number) => {
    setValue(value || 0);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <CurrencyCard
        currency={BASE_CURRENCY_SYMBOL.currency}
        currencyUnit={BASE_CURRENCY_SYMBOL.currencyUnit}
        value={value}
      >
        <ValueDialog
          currency={BASE_CURRENCY_SYMBOL.currency}
          currencyUnit={BASE_CURRENCY_SYMBOL.currencyUnit}
          value={value}
          onChange={handleValueChange}
        />
      </CurrencyCard>
      <div className="mt-4 flex w-full flex-col gap-4">
        {CURRENCY_SYMBOLS.map((symbol) => (
          <CurrencyCard
            key={symbol.currency}
            currency={symbol.currency}
            currencyUnit={symbol.currencyUnit}
            value={latestRates.rates[symbol.currency] * value}
            fromCurrency={BASE_CURRENCY_SYMBOL.currency}
            fromCurrencyRate={latestRates.rates[symbol.currency]}
          >
            <TimeseriesDialog currency={symbol.currency} />
          </CurrencyCard>
        ))}
      </div>
    </div>
  );
}
