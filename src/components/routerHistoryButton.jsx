"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export function BackwardButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} aria-label="Go back">
      <ChevronLeft className="w-6 h-6" />
      <span className="hidden md:inline-block">Move Backward</span>
    </Button>
  );
}

export function ForwardButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.forward()} aria-label="Go back">
      <span className="hidden md:inline-block">Move Forward</span>
      <ChevronRight className="w-6 h-6" />
    </Button>
  );
}
