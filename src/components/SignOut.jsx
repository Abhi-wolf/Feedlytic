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
import Link from "next/link";

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
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button
                variant="destructive"
                type="submit"
                size="sm"
                className="h-6 rounded-md px-2 text-xs"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* <div className="flex gap-2 justify-between items-center border-l-2 border-r-2 px-[6px] my-2 border-gray-200 cursor-pointer">
        <Avatar className="h-6 w-6 ">
          <AvatarImage
            src={`${
              user?.image ? user?.image : "https://github.com/shadcn.png"
            }`}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col ">
          <span className="text-xs text-purple-600 font-semibold">
            {user?.name}
          </span>
          <span className="text-xs text-gray-500  ">{user?.email}</span>
        </div>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button
          variant="destructive"
          type="submit"
          size="sm"
          className="h-6 rounded-md px-2 text-xs"
        >
          Sign Out
        </Button>
      </form> 
      
      */
