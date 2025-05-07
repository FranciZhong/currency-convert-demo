"use client";

import type { CurrencyTimeseries } from "@/lib/currency";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  rate: {
    label: "Rate",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface TimeseriesChartProps {
  data: CurrencyTimeseries;
}

export default function TimeseriesChart({ data }: TimeseriesChartProps) {
  // Transform the rate data for Recharts
  const chartData = Object.entries(data.rates).map(([date, rate]) => ({
    date,
    rate,
  }));

  // Format the currency (up to 4 decimal places)
  const formatCurrency = (value: number) => {
    return value.toFixed(2);
  };

  // Format the date to DD/MM format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <div className="min-h-36 w-full">
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 4,
            right: 4,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            stroke="var(--muted-foreground)"
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            stroke="var(--muted-foreground)"
            width={40}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="rate"
            type="monotone"
            fill="var(--color-chart-2)"
            fillOpacity={0.4}
            stroke="var(--color-chart-2)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
