import Totalvisits from "./totalVisits";
import Pagevisits from "./pageVisits";
import TopPageVisitsList from "./topPageVisitsList";
import TopVisitSources from "./topVisitSources";
import AnalayticsHeader from "./analayticsHeader";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
        <Totalvisits params={params} />
        <Pagevisits params={params} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TopPageVisitsList params={params} />
        <TopVisitSources params={params} />
      </div>
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
