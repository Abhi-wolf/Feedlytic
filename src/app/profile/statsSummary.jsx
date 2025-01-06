import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatsSummary } from "@/lib/queries/profileQueries";

export default async function StatsSummary() {
  const { error, data } = await getStatsSummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex gap-2 justify-center items-center text-red-500 italic">
            <span>{error}</span>
            😔
          </div>
        ) : (
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Websites</dt>
              <dd className="text-3xl font-semibold">{data?.websiteCount}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Total Page Views
              </dt>
              <dd className="text-3xl font-semibold">
                {data?.totalPageViews?.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Total Visits
              </dt>
              <dd className="text-3xl font-semibold">
                {data?.totalVisits?.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Average Rating
              </dt>
              <dd className="text-3xl font-semibold">
                {data?.averageRating?.toFixed(1)}
              </dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
