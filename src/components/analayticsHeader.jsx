"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Snippet from "@/components/Snippet";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";
import { useFilterContext } from "@/context/FilterProvider";

export default function AnalayticsHeader({
  title = "Analytics",
  data,
  params,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { dateFilter, setDateFilter } = useFilterContext();

  const handleRefresh = () => {
    setLoading(true);
    router.refresh();

    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    if (dateFilter) {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set("dateRange", dateFilter);

      if (params.website)
        router.push(`/w/${params.website}?${currentParams.toString()}`);
    }
  }, [dateFilter, searchParams, params]);

  return (
    <>
      <h1 className="w-full text-2xl lg:text-3xl font-bold ">
        {title} Dashboard
      </h1>
      <div className="w-full flex justify-between md:justify-end gap-3">
        <ApiKeyDialog oldApiKey={data?.apiKey} params={params} />

        <Snippet />

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="flex gap-3 items-center"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <p className="hidden md:inline-block">Refreshing...</p>
            </>
          ) : (
            <>
              <RefreshCcw className="h-4 w-4" />
              <p className="hidden md:inline-block">Refresh</p>
            </>
          )}
        </Button>
      </div>
    </>
  );
}
