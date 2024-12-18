"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Check, Copy, Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

function TrackingSnippetDialog() {
  const { website } = useParams();
  const [copied, setCopied] = useState(null);

  const JS_codeString = `<script defer data-domain="${website}"
   src="https://feedlytic.vercel.app/tracking-script.js"></script>`;

  const NextJS_codeString = `
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="${website}"
          src="https://feedlytic.vercel.app/tracking-script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}`;

  const EVENT_API_codeString = `const apiURL = "https://feedlytic.vercel.app/api/events";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer {apiKey}",
};
const eventData = {
  eventName: "",    // required
  domain: "",  // required
  eventDescription: "", // optional
};

// using axios
const sendRequest = async () => {
  axios
    .post(apiURL, eventData, { headers })
    .then()
    .catch((error) => {
      console.error("Error:", error);
    });
};

// using fetch
const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer {apiKEY}",
      body: JSON.stringify(eventData), 
    });
`;

  const FEEDBACK_API_codeString = `const apiURL = "https://feedlytic.vercel.app/api/events";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer {apiKey}",
};
const eventData = {
  eventName: "",    // required
  domain: "",  // required
  eventDescription: "", // optional
};

// using axios
const sendRequest = async () => {
  axios
    .post(apiURL, eventData, { headers })
    .then()
    .catch((error) => {
      console.error("Error:", error);
    });
};

// using fetch
const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer {apiKEY}",
      body: JSON.stringify(eventData), 
    });
`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success("Snippet copied successfully");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Code className="w-4 h-4" />
          Snippet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add tracking snippet to your website
          </DialogTitle>
          <DialogDescription>
            Choose the appropriate snippet based on your website technology.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="js" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="js">JS / React / Next.js</TabsTrigger>
            <TabsTrigger value="eventApi">Event API</TabsTrigger>
            <TabsTrigger value="feedbackApi">Feedback API</TabsTrigger>
          </TabsList>
          <TabsContent value="js" className="flex flex-col gap-4">
            <SnippetCard
              title="For JavaScript or React projects"
              description="Add this script tag to your HTML file, preferably just before the closing </head> tag:"
              code={JS_codeString}
              language="html"
              copied={copied === "js"}
              onCopy={() => copyToClipboard(JS_codeString, "js")}
            />

            <SnippetCard
              title="For Next.js projects"
              description="Add this code to your app/layout.js or app/layout.tsx file:"
              code={NextJS_codeString}
              language="jsx"
              copied={copied === "nextjs"}
              onCopy={() => copyToClipboard(NextJS_codeString, "nextjs")}
            />
          </TabsContent>
          <TabsContent value="nextjs">
            <SnippetCard
              title="For Next.js projects"
              description="Add this code to your app/layout.js or app/layout.tsx file:"
              code={NextJS_codeString}
              language="jsx"
              copied={copied === "nextjs"}
              onCopy={() => copyToClipboard(NextJS_codeString, "nextjs")}
            />
          </TabsContent>
          <TabsContent value="eventApi">
            <SnippetCard
              title="API Integration"
              description="Use this code to integrate with our events API:"
              code={EVENT_API_codeString}
              language="javascript"
              copied={copied === "eventApi"}
              onCopy={() => copyToClipboard(EVENT_API_codeString, "eventApi")}
            />
          </TabsContent>
          <TabsContent value="feedbackApi">
            <SnippetCard
              title="API Integration"
              description="Use this code to integrate with our events API:"
              code={FEEDBACK_API_codeString}
              language="javascript"
              copied={copied === "feedbackApi"}
              onCopy={() =>
                copyToClipboard(FEEDBACK_API_codeString, "feedbackApi")
              }
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function SnippetCard({ title, description, code, language, copied, onCopy }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            {code}
          </SyntaxHighlighter>
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-2 right-2"
            onClick={onCopy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TrackingSnippetDialog;
