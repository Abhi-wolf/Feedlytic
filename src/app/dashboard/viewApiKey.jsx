"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ViewApiKey({ apikey }) {
  const [type, setType] = useState("password");

  function handleViewApiKey() {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  }

  const handleCopy = () => {
    if (apikey) {
      navigator.clipboard.writeText(apikey);
      toast.success("API key copied to clipboard.");
    } else {
      toast.error("API key not found, generate new key");
    }
  };

  return (
    <div className="flex w-full justify-between items-center">
      {apikey ? (
        <div className="flex w-full gap-2 items-center">
          <label>Api Key</label>
          <Input
            type={type}
            value={apikey}
            disabled={true}
            className={`h-8 w-[80%] ${type === "password" && "blur-sm"}`}
          />
        </div>
      ) : (
        <p className="w-full text-red-300 text-xs ml-2 italic">
          api key not found
        </p>
      )}
      <Button
        size="icon"
        variant="ghost"
        onClick={handleViewApiKey}
        disabled={!apikey}
      >
        {type === "password" ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </Button>

      <Button
        size="icon"
        variant="ghost"
        onClick={handleCopy}
        disabled={!apikey}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
