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
import { useRouter } from "next/navigation";
import { useState } from "react";
import Snippet from "./Snippet";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";

export default function AnalayticsHeader({
  title = "Analytics",
  data,
  params,
}) {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState("Last 7 days");

  const router = useRouter();

  const handleRefresh = () => {
    setLoading(true);
    router.refresh();

    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <>
      <h1 className="w-full text-2xl md:text-3xl font-bold ">
        {title} Dashboard
      </h1>
      <div className="w-full flex justify-between md:justify-end gap-3">
        <ApiKeyDialog oldApiKey={data?.apiKey} params={params} />

        <Snippet />

        {/* <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7 days">Last 7 days</SelectItem>
            <SelectItem value="Last 30 days">Last 30 days</SelectItem>
            <SelectItem value="Last 3 months">Last 3 months</SelectItem>
            <SelectItem value="Last 12 months">Last 12 months</SelectItem>
          </SelectContent>
        </Select> */}
        {/* <Button
          variant="outline"
          className="flex gap-3"
          size="sm"
          onClick={handleRefresh}
        >
          <RefreshCcw className="h-4 w-4" />{" "}
          <p className="hidden md:inline-block">Refresh</p>
        </Button> */}

        <Button
          variant="outline"
          className="flex gap-3 items-center"
          size="sm"
          onClick={handleRefresh}
          disabled={loading} // Disable button while loading
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
