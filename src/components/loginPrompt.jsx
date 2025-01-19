import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import SignIn from "./SignIn";

export default function LoginPrompt() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center  p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-500 dark:text-blue-300" />
          </div>
          <CardTitle className="text-2xl font-bold">Access Required</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Please log in to view this information
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            This content is protected. Sign in to your account to access the
            information you&apos;re looking for.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SignIn text="Login" size="default" />
        </CardFooter>
      </Card>
    </div>
  );
}
