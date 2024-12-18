import Totalvisits from "./totalVisits";
import Pagevisits from "./pageVisits";
import TopPageVisitsList from "./topPageVisitsList";
import TopVisitSources from "./topVisitSources";
import AnalayticsHeader from "./analayticsHeader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loadingSpinner";

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

      <div className="grid gap-4 md:grid-cols-2">
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
      </div>
    </div>
  );
}
