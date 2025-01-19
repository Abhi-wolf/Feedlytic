import { auth, signIn } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { Home, UserRound } from "lucide-react";
import RedirectButton from "@/app/dashboard/redirectButton";

export default async function SignIn({
  text = "Signin with Google",
  icon = <UserRound className="w-4 h-4" />,
  size = "sm",
}) {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <RedirectButton
          href="/dashboard"
          text="Dashboard"
          icon={<Home />}
          size="default"
        />
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google", {
              redirect: true,
              redirectTo: "/dashboard",
            });
          }}
        >
          <Button type="submit" size={size} className="flex gap-2">
            <span>{icon}</span> {text}
          </Button>
        </form>
      )}
    </>
  );
}
