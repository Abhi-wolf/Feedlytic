import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsPage from "./analyticsPage";
import FeedbacksPage from "@/app/_feedback/page";
import { getWebsiteDetails } from "@/lib/queries/getWebsitesAnalytics";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import EventsPage from "@/app/_events/page";

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

        <Link href="/dashboard">
          <Button>
            <Home />
            Dashboard
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mx-2">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="events">Custom Events</TabsTrigger>
          <TabsTrigger value="feedbacks"> Feedbacks</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AnalyticsPage params={params} data={data} />
        </TabsContent>
        <TabsContent value="events">
          <EventsPage params={params} data={data} />
        </TabsContent>
        <TabsContent value="feedbacks">
          <FeedbacksPage params={params} data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/*
<Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPages.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.page}</TableCell>
                    <TableCell className="text-right">
                      {item.views.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Visit Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Visits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSources.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.source}</TableCell>
                    <TableCell className="text-right">
                      {item.visits.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
*/
