import { getLatestRates } from "@/lib/api/open-exchange-api";

export default async function Home() {
  const latestRates = await getLatestRates();

  // TODO: Remove this
  console.log(latestRates);

  return (
    <div className="h-min-[100dvh] flex justify-center">
      <div className="container flex max-w-2xl flex-col items-center gap-4 px-8">
        <h1 className="bg-background sticky top-0 py-4 text-left text-2xl font-bold">
          Currency Converter
        </h1>
      </div>
    </div>
  );
}
