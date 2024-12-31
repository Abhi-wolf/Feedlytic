import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalayticsHeader from "@/components/analayticsHeader";
import Totalvisits from "./totalVisits";
import Pagevisits from "./pageVisits";
import TopPageVisitsList from "./topPageVisitsList";
import TopSourcesAndCountry from "./topSourcesAndCountry";
import TopOSAndDeviceType from "./topOSAndDeviceType";
import TopBrowserAndTimeZones from "./topBrowserAndTimeZones";
import { PageViewsChart } from "./pageViewsChart";
import { VisitsChart } from "./visitsChart";

export default async function AnalyticsPage({ params, data, dateRange }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-4 mt-4 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <AnalayticsHeader data={data} params={params} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner size="small" />
            </div>
          }
        >
          <Totalvisits params={params} dateRange={dateRange} />
        </Suspense>

        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner size="small" />
            </div>
          }
        >
          <Pagevisits params={params} dateRange={dateRange} />
        </Suspense>
      </div>

      <Tabs defaultValue="pagesViews" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pagesViews">Pages Views</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
        </TabsList>

        <TabsContent value="pagesViews">
          <PageViewsChart params={params} />
        </TabsContent>
        <TabsContent value="visits">
          <VisitsChart params={params} />
        </TabsContent>
      </Tabs>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        }
      >
        <TopPageVisitsList params={params} dateRange={dateRange} />
      </Suspense>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        }
      >
        <TopSourcesAndCountry params={params} dateRange={dateRange} />
      </Suspense>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        }
      >
        <TopOSAndDeviceType params={params} dateRange={dateRange} />
      </Suspense>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="medium" />
          </div>
        }
      >
        <TopBrowserAndTimeZones params={params} dateRange={dateRange} />
      </Suspense>
    </div>
  );
}
