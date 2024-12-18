"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Check, Copy, Home } from "lucide-react";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SampleFeedback() {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (sample, type = "js") => {
    navigator.clipboard.writeText(sample);
    setCopied(sample);
    toast.success("Snippet copied successfully");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="md:w-[70%] mx-auto mt-24">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Sample code for feedback collection
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                A sample feedback react component using tailwind and shadCN
                library
              </p>
            </div>

            <Link href="/dashboard">
              <Button>
                <Home />
                Dashboard
              </Button>
            </Link>
          </div>
          <div className="relative">
            <SyntaxHighlighter
              language="js"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1rem",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              {sample}
            </SyntaxHighlighter>
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(sample, "js")}
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
    </div>
  );
}

const sample = `"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function FeedbackForm() {
  const { toast } = useToast()
  const { website } = useParams()
  const [name, setName] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Feedback submitted:", { name, feedback })
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
    setName("")
    setFeedback("")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Provide Feedback</CardTitle>
        <CardDescription>
          We value your input on {website}. Your feedback helps us improve our service.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}`;
