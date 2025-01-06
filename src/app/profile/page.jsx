import { Home } from "lucide-react";
import RedirectButton from "../dashboard/redirectButton";
import PersonalInfo from "./personalInfo";
import RecentEvents from "./recentEvents";
import StatsSummary from "./statsSummary";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/loadingSpinner";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 mt-14 px-2">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>

        <RedirectButton href="/dashboard" text="Dashboard" icon={<Home />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PersonalInfo />
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner size="small" />
            </div>
          }
        >
          <StatsSummary />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="small" />
          </div>
        }
      >
        <RecentEvents />
      </Suspense>
    </div>
  );
}
