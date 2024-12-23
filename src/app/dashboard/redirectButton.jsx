"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function RedirectButton({ href, text, icon }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Link href={href} onClick={handleClick}>
      <Button
        size="sm"
        disabled={isLoading}
        className={`relative ${isLoading ? "cursor-wait" : ""}`}
      >
        {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : icon}
        {isLoading ? "Loading..." : text}
      </Button>
    </Link>
  );
}
