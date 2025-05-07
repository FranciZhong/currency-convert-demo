import type { CurrencyTimeseries } from "@/lib/currency";
import { NextResponse } from "next/server";

// TODO: Remove this mock data when timeseries data is available from the API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base") || "AUD";
  const currency = searchParams.get("currency");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate || !currency) {
    return NextResponse.json(
      { error: "startDate, endDate and currency are required" },
      { status: 400 }
    );
  }

  // Add simulated latency (500-2000ms)
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1500 + 500)
  );

  // Generate mock data
  const start = new Date(startDate);
  const end = new Date(endDate);
  const rates: Record<string, number> = {};

  // Generate a random starting value between 0.5 and 2
  let currentRate = 0.5 + Math.random() * 1.5;

  // Generate daily rates with small random changes
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    // Small daily fluctuations (-5% to +5%)
    currentRate += currentRate * (Math.random() * 0.1 - 0.05);

    // Keep rate in reasonable bounds
    currentRate = Math.max(0.1, Math.min(3, currentRate));

    const dateStr = day.toISOString().split("T")[0];
    rates[dateStr] = parseFloat(currentRate.toFixed(4));
  }

  const response: CurrencyTimeseries = {
    base,
    currency,
    startDate,
    endDate,
    rates,
  };

  return NextResponse.json(response);
}
