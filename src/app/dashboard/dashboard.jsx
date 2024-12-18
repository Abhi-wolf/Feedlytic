import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import WebsiteLists from "./websiteLists";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <section className="container mx-auto flex flex-col items-center gap-4 p-2 ">
      <Link href={"/addWebsiteToTrack"} className="flex w-full  justify-end">
        <Button className="justify-end">+ Add New Website</Button>
      </Link>

      <Suspense
        fallback={
          <div className="text-xl font-semibold uppercase">Loading </div>
        }
      >
        <WebsiteLists />
      </Suspense>
    </section>
  );
}
