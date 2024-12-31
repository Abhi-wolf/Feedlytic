"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getThreeMonthPageViews } from "@/lib/queries/getWebsitesAnalytics";
import { useEffect, useMemo, useState } from "react";
import { useFilterContext } from "@/context/FilterProvider";

const chartConfig = {
  views: {
    label: "Page views",
    color: "hsl(var(--chart-1))",
  },
};

export function PageViewsChart({ params }) {
  // const [timeRange, setTimeRange] = useState("30d");
  const { dateFilter, setDateFilter } = useFilterContext();
  const [chartData, setChartData] = useState([]);

  const filteredData = useMemo(() => {
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (dateFilter === "30d") {
      daysToSubtract = 30;
    } else if (dateFilter === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return chartData.filter((item) => new Date(item.date) >= startDate);
  }, [dateFilter, chartData]);

  const maxVisits = useMemo(() => {
    return chartData?.reduce(
      (max, item) => (Number(item.views) > max ? Number(item.views) : max),
      0
    );
  }, [chartData]);

  useEffect(() => {
    const domain = params.website;

    const fetchData = async () => {
      const data = await getThreeMonthPageViews(domain);
      setChartData(data);
    };

    fetchData();
  }, [params.website]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Page Views Chart</CardTitle>
          <CardDescription>
            Showing total page views for the selected time range
          </CardDescription>
        </div>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            <YAxis
              type="number"
              dataKey="views"
              domain={[0, maxVisits + 5]}
              tickCount={15}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="views"
              type="natural"
              fill="url(#fillVisits)"
              stroke="var(--color-views)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
