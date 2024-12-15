/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { addWebsiteAction } from "../actions/websiteActions.mjs";
import toast from "react-hot-toast";

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

  return (
    <div className=" min-h-screen h-full w-full md:w-[80%] relative items-center justify-center flex flex-col  mx-auto">
      <div className="items-center justify-center p-12 flex flex-col w-full z-0 border-y border-gray-300  text-purple-500">
        {step == 1 ? (
          <div className="w-full items-center justify-center flex flex-col space-y-10">
            <span className="w-full lg:w-[50%] group">
              <p className="text-lg md:text-xl text-gray pb-4 group-hover:text-purple-600 smooth">
                Domain
              </p>
              <input
                value={website}
                onChange={(e) =>
                  setWebsite(e.target.value.trim().toLowerCase())
                }
                type="text"
                className="input text-lg md:text-xl"
              />
              {error ? (
                <p className="text-xs pt-2 font-light text-red-400">{error}</p>
              ) : (
                <p className="text-xs text-gray-400 pt-2 font-light">
                  Enter the domain or subdomain without {"www"}
                </p>
              )}
            </span>
            {error == "" && (
              <Button onClick={addWebsite} className="capitalize">
                {loading ? "adding..." : "add website"}
              </Button>
            )}
          </div>
        ) : (
          <div className="w-full items-center justify-center flex flex-col space-y-10">
            <span className="w-full lg:w-[50%]">
              <textarea
                type="text"
                className="input text-purple-400-400 cursor-pointer"
                disabled
                value={`<script defer data-domain="${website}"
                src="http://localhost:3000/tracking-script.js"></script>`}
              />
              <p className="text-xs text-gray-500 pt-2 font-light">
                Paste this snippet in the{" "}
                <b className="text-red-600">{"<head>"}</b> of your website.
              </p>
            </span>
            <Button
              className="capitalize"
              onClick={() => router.push(`/w/${website.trim()}`)}
            >
              Added
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnBoardingPage;
