"use client";

import { useState } from "react";
import { Copy, Key, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { generateNewApiKey } from "@/app/_actions/websiteActions.mjs";

export function ApiKeyDialog({ oldApiKey, params }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(oldApiKey);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const res = await generateNewApiKey({ params });

      if (res.success) {
        setApiKey(res.apiKey);
        toast.success("Api key generated successfully");
      }
    } catch (error) {
      toast.error(`${error ? error : "Something went wrong"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard.");
  };

  const handleClose = () => {
    setIsOpen(false);
    setApiKey("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Key</DialogTitle>
          <DialogDescription>
            Create a new API key to access our services. Make sure to copy your
            API key, you won&apos;t be able to see it again!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full">
            <Input
              id="name"
              value={apiKey}
              className="w-full"
              placeholder="My API Key"
              disabled={true}
            />
          </div>
        </div>
        <DialogFooter className="w-full flex flex-row justify-between items-center">
          {apiKey && (
            <Button
              variant="outline"
              onClick={handleCopy}
              disabled={isLoading || !apiKey}
            >
              <Copy className="h-4 w-4" /> Copy
            </Button>
          )}
          <Button type="submit" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <Loader className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              <Key className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Generating New Api Key..." : "Generate New Api Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
