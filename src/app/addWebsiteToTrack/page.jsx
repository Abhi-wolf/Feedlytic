/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { addWebsiteAction } from "../_actions/websiteActions.mjs";
import { ArrowRight, Check, Code, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function OnBoardingPage() {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const addWebsite = async () => {
    if (website.trim() == "" || loading) return;
    setLoading(true);

    const res = await addWebsiteAction({ domain: website, userId: user.id });

    if (res.success) {
      toast.success("Website added successfully");
      setStep(2);
    } else {
      toast.error(`${res.error ? res.error : "Something went wrong"}  `);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      website.trim().includes("http") ||
      website.trim().includes("http://") ||
      website.trim().includes("https://") ||
      website.trim().includes("://") ||
      website.trim().includes(":") ||
      website.trim().includes("/")
    ) {
      setError("please enter the domain only. ie:(google.com)");
    } else {
      setError("");
    }
  }, [website]);

  if (!user) router.push("/");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold tracking-tight mb-2">
            {step === 1 ? "Add Your Website" : "Install Tracking Script"}
          </h2>
          <p className="text-xl text-muted-foreground">
            {step === 1
              ? "Enter your website domain to get started"
              : "Copy and paste this snippet into your website's <head> tag"}
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
                  <Input
                    value={website}
                    onChange={(e) =>
                      setWebsite(e.target.value.trim().toLowerCase())
                    }
                    type="text"
                    placeholder="feedlytic.vercel.app"
                    className="pl-12 pr-4 py-6 text-lg bg-background border-input rounded-lg"
                  />
                </div>
                {error ? (
                  <p className="text-sm text-destructive flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Enter the domain or subdomain without &quot;www&quot;
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-muted p-6 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<script defer data-domain="${website}"
src="https://feedlytic.vercel.app/tracking-script.js"></script>`}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `<script defer data-domain="${website}" src="https://feedlytic.vercel.app/tracking-script.js"></script>`
                      );
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Paste this snippet in the{" "}
                  <span className="font-semibold text-primary mx-1">
                    {"<head>"}
                  </span>{" "}
                  of your website.
                </p>
              </div>
            )}
          </div>

          <div className="px-8 py-6 bg-muted">
            <Button
              onClick={
                step === 1
                  ? addWebsite
                  : () => router.push(`/w/${website.trim()}`)
              }
              disabled={step === 1 && (error !== "" || loading)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg rounded-lg"
            >
              {step === 1
                ? loading
                  ? "Adding..."
                  : "Add Website"
                : "Go to Dashboard"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnBoardingPage;
