import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/context/ThemeProvider";

import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import FeedbackForm from "@/components/feedbackForm";
import { FilterProvider } from "@/context/FilterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feedlytic",
  description: "A simple analytics, event tracking and feedback tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="feedlytic.vercel.app"
          src="https://feedlytic.vercel.app/tracking-script.js"
        />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <AuthProvider>
            <FilterProvider>{children}</FilterProvider>
            <FeedbackForm />
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
