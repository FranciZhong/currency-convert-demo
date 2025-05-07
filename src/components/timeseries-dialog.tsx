"use client";

import type { CurrencyTimeseries } from "@/lib/currency";
import { AlertTriangle, Loader2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import TimeseriesChart from "./timeseries-chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface TimeseriesDialogProps {
  currency: string;
}

export default function TimeseriesDialog({ currency }: TimeseriesDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currencyTimeseries, setCurrencyTimeseries] =
    useState<CurrencyTimeseries | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Calculate date range for the last 14 days
  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  // Fetch mocked timeseries data when dialog opens
  useEffect(() => {
    async function fetchTimeseriesData() {
      if (!open) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/timeseries?base=AUD&currency=${currency}&startDate=${startDate}&endDate=${endDate}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching timeseries data: ${response.statusText}`
          );
        }

        const data = await response.json();
        setCurrencyTimeseries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTimeseriesData();
  }, [open, currency, startDate, endDate]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrendingUp className="hover:bg-muted hover:text-muted-foreground size-10 rounded-lg p-2 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trending</DialogTitle>
          <DialogDescription>
            This is the time series of the currency {currency}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex min-h-36 w-full flex-col items-center justify-center gap-4">
          {isLoading && <Loader2 className="animate-spin" />}
          {error && (
            <div className="flex flex-col items-center gap-2">
              <AlertTriangle className="size-10 text-yellow-500" />
              <p className="text-yellow-500">{error}</p>
            </div>
          )}
          {currencyTimeseries && !isLoading && (
            <TimeseriesChart data={currencyTimeseries} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
