import { mergeClassNames } from "@/lib/utils/style";
import { AU, CA, EU, GB, NZ, US } from "country-flag-icons/react/3x2";

interface CurrencyImageProps {
  currency: string;
  className?: string;
}

export default function CurrencyImage({
  currency,
  className,
}: CurrencyImageProps) {
  const currencyClassName = mergeClassNames("w-8 h-8", className);

  switch (currency) {
    case "USD":
      return <US title="USD" className={currencyClassName} />;
    case "GBP":
      return <GB title="GBP" className={currencyClassName} />;
    case "CAD":
      return <CA title="CAD" className={currencyClassName} />;
    case "EUR":
      return <EU title="EUR" className={currencyClassName} />;
    case "NZD":
      return <NZ title="NZD" className={currencyClassName} />;
    case "AUD":
      return <AU title="AUD" className={currencyClassName} />;
    default:
      return null;
  }
}
