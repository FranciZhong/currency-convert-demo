import CurrencyConvert from "@/components/currency-convert";
import ErrorCard from "@/components/error-card";
import { getLatestRates } from "@/lib/api/open-exchange-api";
export default async function Home() {
  try {
    const latestRates = await getLatestRates();

    return (
      <div className="h-min-[100dvh] flex justify-center">
        <div className="container flex max-w-2xl flex-col items-center gap-4 px-8">
          <h1 className="bg-background sticky top-0 py-4 text-left text-2xl font-bold">
            Currency Converter
          </h1>
          <CurrencyConvert latestRates={latestRates} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex h-[100dvh] items-center justify-center">
        <ErrorCard>
          <p className="text-lg font-semibold">Failed to fetch latest rates.</p>
          <p className="text-muted-foreground font-light">
            Please try again later.
          </p>
        </ErrorCard>
      </div>
    );
  }
}
