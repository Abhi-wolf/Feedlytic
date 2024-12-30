import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsPage from "@/app/_analytics/analyticsPage";
import FeedbacksPage from "@/app/_feedback/page";
import { getWebsiteDetails } from "@/lib/queries/getWebsitesAnalytics";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import EventsPage from "@/app/_events/page";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loadingSpinner";
import RedirectButton from "@/app/dashboard/redirectButton";

export default async function page({ params }) {
  const session = await auth();
  const data = await getWebsiteDetails({ params });

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto flex flex-col gap-4 mt-20">
      <div className="flex justify-between items-center my-2 md:my-4">
        <h1 className="hidden md:inline-block text-xl md:text-2xl  ">
          Domain :{" "}
          <span className="underline decoration-wavy text-blue-400">
            {params.website}
          </span>
        </h1>

        <RedirectButton href="/dashboard" text="Dashboard" icon={<Home />} />
      </div>
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mx-2">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="events">Custom Events</TabsTrigger>
          <TabsTrigger value="feedbacks"> Feedbacks</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center">
                <LoadingSpinner size="medium" />
              </div>
            }
          >
            <AnalyticsPage params={params} data={data} />
          </Suspense>
        </TabsContent>
        <TabsContent value="events">
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center">
                <LoadingSpinner size="medium" />
              </div>
            }
          >
            <EventsPage params={params} data={data} />
          </Suspense>
        </TabsContent>
        <TabsContent value="feedbacks">
          <Suspense
            fallback={
              <div className="w-full flex items-center justify-center">
                <LoadingSpinner size="medium" />
              </div>
            }
          >
            <FeedbacksPage params={params} data={data} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
