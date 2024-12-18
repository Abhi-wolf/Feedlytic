"use client";

import { useState } from "react";
import { Copy, Key } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import { generateNewApiKey } from "@/app/actions/websiteActions.mjs";

export function ApiKeyDialog({ oldApiKey, params }) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(oldApiKey);

  const handleGenerate = async () => {
    try {
      const res = await generateNewApiKey({ params });

      if (res.success) {
        setApiKey(res.apiKey);
        toast.success("Api key generated successfully");
      }
    } catch (error) {
      toast.error(`${error ? error : "Something went wrong"}`);
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
          {/* {apiKey && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <div className="col-span-3 flex">
                <Input
                  id="api-key"
                  value={apiKey}
                  readOnly
                  className="font-mono"
                />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )} */}
        </div>
        <DialogFooter className="w-full flex flex-row justify-between items-center">
          {apiKey && (
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4" /> Copy
            </Button>
          )}
          <Button type="submit" onClick={handleGenerate}>
            <Key className="mr-2 h-4 w-4" />
            Generate New Api Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* {!apiKey ? (
            <Button type="submit" onClick={handleGenerate}>
              <Key className="mr-2 h-4 w-4" />
              Generate New Api Key
            </Button>
          ) : (
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4" /> Copy
            </Button>
          )} */

// b7af8e62-82c1-45a3-b5a4-66b946bc31e6
// ecf0fb23-f09b-4f04-b3ca-0391807aedff
