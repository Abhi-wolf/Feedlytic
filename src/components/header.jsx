import { BarChart2, UserRound } from "lucide-react";
import Link from "next/link";
import { SignOut } from "./SignOut";
import SignIn from "./SignIn";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/auth";
import { BackwardButton, ForwardButton } from "./routerHistoryButton";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/40 mb-5 md:mb-10">
        <Link
          className="flex items-center justify-center gap-2"
          href="/dashboard"
        >
          <BarChart2 className="h-6 w-6" />
          <span className="font-semibold hidden md:inline-block">
            Open Analytics
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
      {user && (
        <div className="hidden md:flex justify-between w-[80%] mx-auto mt-4 ">
          <BackwardButton />
          <ForwardButton />
        </div>
      )}
    </>
  );
}
