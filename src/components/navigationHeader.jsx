"use client";

import { BarChart, Calendar, MessageSquare, User } from "lucide-react";

import { BackwardButton, ForwardButton } from "./routerHistoryButton";
import { useSession } from "next-auth/react";

const navItems = [
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
];

export function NavigationHeader() {
  const session = useSession();
  const user = session?.data?.user;

  if (!user) return null;

  return (
    <header className=" mt-20 mb-10 flex justify-between items-center w-[95%] md:w-[80%] mx-auto">
      <BackwardButton />
      <ForwardButton />
    </header>
  );
}
