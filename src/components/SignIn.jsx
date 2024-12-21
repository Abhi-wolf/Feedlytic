import { auth, signIn } from "@/auth";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function SignIn({
  text = "Signin with Google",
  icon,
  size = "sm",
}) {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <Link href="/dashboard">
          <Button>My Dashboard</Button>
        </Link>
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
            {text} <span>{icon}</span>
          </Button>
        </form>
      )}
    </>
  );
}
