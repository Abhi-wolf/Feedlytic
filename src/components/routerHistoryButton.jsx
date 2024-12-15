"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export function BackwardButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} aria-label="Go back">
      <ChevronLeft className="w-6 h-6" /> Move Backward
    </Button>
  );
}

export function ForwardButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.forward()} aria-label="Go back">
      Move Forward <ChevronRight className="w-6 h-6" />
    </Button>
  );
}
