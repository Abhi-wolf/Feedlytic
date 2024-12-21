import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUserProfile } from "@/lib/queries/profileQueries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default async function ProfilePage() {
  const profile = await getUserProfile();

  return (
    <div className="container mx-auto py-8 mt-14 px-2">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        <Link href="/dashboard">
          <Button>
            <Home />
            <span className="hidden md:inline-block">Dashboard</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.user.image} alt={profile.user.name} />
              <AvatarFallback>{profile.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{profile.user.name}</h2>
              <p className="text-gray-500">{profile.user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Website Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Websites</dt>
                <dd className="text-3xl font-semibold">
                  {profile.websiteCount}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Total Page Views
                </dt>
                <dd className="text-3xl font-semibold">
                  {profile.totalPageViews.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Total Visits
                </dt>
                <dd className="text-3xl font-semibold">
                  {profile.totalVisits.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Average Rating
                </dt>
                <dd className="text-3xl font-semibold">
                  {profile.averageRating.toFixed(1)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {profile.recentEvents.map((event) => (
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
        </CardContent>
      </Card>
    </div>
  );
}
