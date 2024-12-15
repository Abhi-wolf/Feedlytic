import SignIn from "@/components/SignIn";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, LineChart, PieChart } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col ">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Unlock the Power of Your Data
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform raw data into actionable insights with our
                  cutting-edge analytics platform.
                </p>
              </div>
              <div className="flex gap-3 ">
                <SignIn text="Get Started" />
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <LineChart className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Real-time Analytics</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Get instant insights with our real-time data processing and
                  visualization tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <PieChart className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">Custom Dashboards</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Create personalized dashboards tailored to your specific
                  business needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <BarChart2 className="h-12 w-12 text-purple-500" />
                <h3 className="text-xl font-bold">Advanced Reporting</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Generate comprehensive reports with just a few clicks, saving
                  you time and effort.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of businesses already leveraging our analytics
                  platform to drive growth.
                </p>
              </div>

              <SignIn
                text="Start Your Free Trial"
                icon={<ArrowRight className="ml-2 h-4 w-4" />}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Open Analytics. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
