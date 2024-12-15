// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useParams } from "next/navigation";
// import React from "react";
// import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
// import { sunburst } from "react-syntax-highlighter/dist/esm/styles/hljs";

// function Snippet() {
//   const { website } = useParams();
//   const JS_codeString = `<script defer data-domain="${website}" src="https://monitoryour.website/tracking-script.js"></script>`;
//   const NextJS_codeString = `
// <Script
// defer
// data-domain="${website}"
// src="https://monitoryour.website/tracking-script.js"/>
//    `;
//   return (
//     <Dialog className="">
//       <DialogTrigger className="text-sm text-gray-400 hover:text-white smooth">
//         <Button>snippet</Button>
//       </DialogTrigger>
//       <DialogContent
//         className="bg-black bg-opacity-10 filter backdrop-blur-md
//                  text-white min-h-[400px] border border-white/5 outline-none"
//       >
//         <DialogHeader className="">
//           <DialogTitle className="py-6 ">
//             Add this snippet to your website
//           </DialogTitle>
//           <DialogDescription
//             className="items-center
//                      justify-center flex border border-white/5 "
//           >
//             <Tabs defaultValue="Js/React" className="w-full space-y-5">
//               <TabsList
//                 className="w-full bg-black rounded-none space-x-5
//                          bg-white/5 items-center justify-center flex"
//               >
//                 <TabsTrigger value="Js/React" className="rounded-none">
//                   Js/React
//                 </TabsTrigger>
//                 <TabsTrigger className="rounded-none" value="Nextjs">
//                   Nextjs
//                 </TabsTrigger>
//               </TabsList>
//               <TabsContent value="Js/React" className="p-4">
//                 <b className="text-red-500 font-normal italic">
//                   inside index.html
//                 </b>
//                 <SyntaxHighlighter
//                   wrapLongLines
//                   language="javascript"
//                   style={sunburst}
//                 >
//                   {JS_codeString}
//                 </SyntaxHighlighter>
//               </TabsContent>
//               <TabsContent value="Nextjs" className="p-4">
//                 <b className="text-red-500 font-normal italic">
//                   inside app/layout.js
//                 </b>
//                 <SyntaxHighlighter
//                   wrapLongLines
//                   language="javascript"
//                   style={sunburst}
//                 >
//                   {NextJS_codeString}
//                 </SyntaxHighlighter>
//               </TabsContent>
//             </Tabs>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default Snippet;

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
import { Check, Copy, Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function Snippet() {
  const { website } = useParams();
  const [copied, setCopied] = useState(null);

  const JS_codeString = `<script defer data-domain="${website}"
   src="http://localhost:3000/tracking-script.js"></script>`;
  const NextJS_codeString = `
import Script from 'next/script'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="${website}"
          src="http://localhost:3000/tracking-script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="" className="gap-2">
          <Code className="w-5 h-5" />
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="js">JavaScript / React</TabsTrigger>
            <TabsTrigger value="nextjs">Next.js</TabsTrigger>
          </TabsList>
          <TabsContent value="js">
            <SnippetCard
              title="For JavaScript or React projects"
              description="Add this script tag to your HTML file, preferably just before the closing </head> tag:"
              code={JS_codeString}
              language="html"
              copied={copied === "js"}
              onCopy={() => copyToClipboard(JS_codeString, "js")}
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function SnippetCard({ title, description, code, language, copied, onCopy }) {
  return (
    <Card className=" ">
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

export default Snippet;
