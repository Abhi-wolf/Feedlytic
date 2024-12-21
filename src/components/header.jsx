import { BarChart2, UserRound } from "lucide-react";
import Link from "next/link";
import { SignOut } from "./SignOut";
import SignIn from "./SignIn";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-background shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/40 fixed top-0 left-0 right-0 z-50 w-full">
        <Link
          className="flex items-center justify-center gap-2"
          href="/dashboard"
        >
          <BarChart2 className="h-6 w-6" />
          <span className="font-semibold hidden md:inline-block">
            Feedlytic
          </span>
        </Link>

        <div className="ml-auto flex gap-3 sm:gap-2 items-center">
          <ThemeToggle />
          <div>
            {user ? (
              <SignOut />
            ) : (
              <SignIn icon={<UserRound className="w-4 h-4" />} />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
