"use client";

import { mergeClassNames } from "@/lib/utils/style";
import { useMemo } from "react";
import CurrencyImage from "./currency-image";
import { Card } from "./ui/card";

interface CurrencyCardProps {
  currency: string;
  currencyUnit: string;
  value: number;
  fromCurrency?: string;
  fromCurrencyRate?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function CurrencyCard({
  currency,
  currencyUnit,
  value,
  fromCurrency,
  fromCurrencyRate,
  className,
  children,
}: CurrencyCardProps) {
  const currencyImage = useMemo(() => {
    return <CurrencyImage currency={currency} />;
  }, [currency]);

  return (
    <Card className={mergeClassNames("w-full px-4", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 overflow-hidden rounded-full">
              {currencyImage}
            </div>
            <span className="font-semibold">{currency}</span>
          </div>
          <div>
            <div className="flex items-center justify-end gap-1 font-semibold">
              <span>{currencyUnit}</span>
              <span>{`${value.toFixed(2)}`}</span>
            </div>
            {fromCurrency && fromCurrencyRate && (
              <span className="text-muted-foreground text-sm font-light">
                {`1 ${fromCurrency} = ${fromCurrencyRate.toFixed(4)} ${currency}`}
              </span>
            )}
          </div>
        </div>
        <div className="flex h-full items-center justify-center border-l pl-2">
          {children}
        </div>
      </div>
    </Card>
  );
}
