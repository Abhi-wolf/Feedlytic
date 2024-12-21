import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserWebsites } from "@/lib/queries/getWebsitesAnalytics";
import { Calendar, Eye, Globe } from "lucide-react";
import Link from "next/link";
import ConfirmDeleteWebsite from "./confirmDeleteWebsite";
import { transformTimestamp } from "@/lib/utils";

async function WebsiteLists() {
  const websites = await getUserWebsites();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-gray-800 underline decoration-wavy">
        Your Websites
      </h2>
      {websites?.length === 0 ? (
        <div className="w-full mt-5 text-center text-red-400">
          {" "}
          No data found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites?.map((web) => (
            <div
              key={web.id}
              className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Card className="h-full ">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-lg md:text-xl font-semibold text-gray-700 truncate">
                      {web.domain}
                    </span>
                  </CardTitle>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex gap-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs text-gray-400">
                        Created On: {transformTimestamp(web.createdAt)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs text-gray-400">
                        Updated On: {transformTimestamp(web.updatedAt)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="text-xs pt-4 text-gray-400 flex items-center justify-between">
                  <ConfirmDeleteWebsite id={web.id} />

                  <Link href={`/w/${web.domain}`}>
                    <Button size="sm">View Analytics</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WebsiteLists;
