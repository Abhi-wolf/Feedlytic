import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default function SignIn({ text = "Signin with Google", icon }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {
          redirect: true,
          redirectTo: "/dashboard",
        });
      }}
    >
      <Button type="submit" size="sm" className="flex gap-2">
        {text} <span>{icon}</span>
      </Button>
    </form>
  );
}
