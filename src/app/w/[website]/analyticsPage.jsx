import Totalvisits from "./totalVisits";
import Pagevisits from "./pageVisits";
import TopPageVisitsList from "./topPageVisitsList";
import TopVisitSources from "./topVisitSources";
import AnalayticsHeader from "./analayticsHeader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function AnalyticsPage({ params, data }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto p-4 mt-4 space-y-6">
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
          <Totalvisits params={params} />
        </Suspense>

        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner size="small" />
            </div>
          }
        >
          <Pagevisits params={params} />
        </Suspense>
      </div>

      <Tabs defaultValue="pagesViews" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pagesViews">Top Pages</TabsTrigger>
          <TabsTrigger value="sources"> Top Visit Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="pagesViews">
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center">
                <LoadingSpinner size="medium" />
              </div>
            }
          >
            <TopPageVisitsList params={params} />
          </Suspense>
        </TabsContent>
        <TabsContent value="sources">
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center">
                <LoadingSpinner size="medium" />
              </div>
            }
          >
            <TopVisitSources params={params} />
          </Suspense>
        </TabsContent>
      </Tabs>

      {/* <div className="grid gap-4 md:grid-cols-2">
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner size="medium" />
            </div>
          }
        >
          <TopPageVisitsList params={params} />
        </Suspense>

        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner size="medium" />
            </div>
          }
        >
          <TopVisitSources params={params} />
        </Suspense>
      </div> */}
    </div>
  );
}
