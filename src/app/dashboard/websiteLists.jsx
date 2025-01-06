import { getUserWebsites } from "@/lib/queries/getWebsitesAnalytics";
import { transformTimestamp } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, Globe, BarChart2 } from "lucide-react";
import ConfirmDeleteWebsite from "./confirmDeleteWebsite";
import RedirectButton from "./redirectButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ViewApiKey from "./viewApiKey";

async function WebsiteLists() {
  const session = await auth();
  const websites = await getUserWebsites();

  if (!session.user) redirect("/");

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Your Websites</h2>
      </div>

      {websites?.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg shadow-inner">
          <Globe className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            No websites yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Add your first website to start tracking analytics
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Website
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites?.map((web) => (
            <div
              key={web.id}
              className="group bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:cursor-pointer shadow-slate-400"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold truncate">
                    {web.domain}
                  </h3>
                  <div className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs font-medium text-green-800 dark:text-green-200">
                    {web?.status || "not active"}
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center">
                    <span className="mr-2">🚀</span> Created On:{" "}
                    {transformTimestamp(web.createdAt)}
                  </p>

                  <ViewApiKey apikey={web?.apiKey} />
                </div>
              </div>
              <div className="bg-muted px-6 py-4 flex justify-between items-center">
                <ConfirmDeleteWebsite id={web.id} />

                <RedirectButton
                  href={`/w/${web.domain}`}
                  text="View Analytics"
                  icon={<BarChart2 className="h-4 w-4 mr-2" />}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WebsiteLists;
