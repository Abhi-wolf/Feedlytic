import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import RedirectButton from "@/app/dashboard/redirectButton";
import { LogOut, User2Icon } from "lucide-react";

export async function SignOut() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex flex-row gap-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 justify-between items-center border-l-2 px-[6px] my-2 border-gray-200 cursor-pointer">
          <Avatar className="h-6 w-6 ">
            <AvatarImage
              src={`${
                user?.image ? user?.image : "https://github.com/shadcn.png"
              }`}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col">
            <span className="text-xs text-purple-600 font-semibold">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500  ">{user?.email}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <RedirectButton
              href="/profile"
              text="My Profile"
              icon={<User2Icon />}
            />
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          <DropdownMenuItem>
            <form
              className="w-full"
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button
                variant="destructive"
                type="submit"
                className="h-7 text-sm"
              >
                <LogOut />
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
