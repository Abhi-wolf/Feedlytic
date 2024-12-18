import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import WebsiteLists from "./websiteLists";
import { LoadingSpinner } from "@/components/loadingSpinner";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <section className="container mx-auto flex flex-col items-center gap-2 p-2 mt-20">
      <Link href={"/addWebsiteToTrack"} className="flex w-full  justify-end">
        <Button className="justify-end">+ Add New Website</Button>
      </Link>

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
