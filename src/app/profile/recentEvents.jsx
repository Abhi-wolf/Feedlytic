import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecentEvents } from "@/lib/queries/profileQueries";

export default async function RecentEvents() {
  const { error, data: recentEvents } = await getRecentEvents();

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex gap-2 justify-center items-center text-red-500 italic">
            <span>{error}</span>
            😔
          </div>
        ) : recentEvents?.length === 0 ? (
          <div className="px-6 py-4 text-sm text-center text-destructive italic">
            No data found 😔
          </div>
        ) : (
          <ul className="space-y-4">
            {recentEvents?.map((event) => (
              <li key={event.id} className="border-b pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold capitalize">
                      {event.eventName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {event.eventDescription}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
