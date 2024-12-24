import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import WebsiteLists from "./websiteLists";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { PlusCircle } from "lucide-react";
import RedirectButton from "./redirectButton";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <section className="container mx-auto flex flex-col items-center gap-2 p-2 mt-20">
      <div className="flex w-full justify-end">
        <RedirectButton
          href="/addWebsiteToTrack"
          text="Add Website"
          icon={<PlusCircle className="mr-1 h-4 w-4" />}
          size="default"
        />
      </div>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="large" />
          </div>
        }
      >
        <WebsiteLists />
      </Suspense>
    </section>
  );
}
