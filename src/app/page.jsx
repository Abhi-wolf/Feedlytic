// import SignIn from "@/components/SignIn";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, BarChart2, LineChart, PieChart } from "lucide-react";
// import Link from "next/link";

// export default async function Home() {
//   return (
//     <div className="flex flex-col mt-10">
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className=" px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
//                   Unlock the Power of Your Data
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
//                   Transform raw data into actionable insights with our
//                   cutting-edge analytics platform.
//                 </p>
//               </div>
//               <div className="flex gap-3 ">
//                 <SignIn text="Get Started" />
//                 <Button variant="outline">Learn More</Button>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
//           <div className=" px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
//               Key Features
//             </h2>
//             <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
//               <div className="flex flex-col items-center space-y-4">
//                 <LineChart className="h-12 w-12 text-blue-500" />
//                 <h3 className="text-xl font-bold">Real-time Analytics</h3>
//                 <p className="text-center text-gray-500 dark:text-gray-400">
//                   Get instant insights with our real-time data processing and
//                   visualization tools.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-4">
//                 <PieChart className="h-12 w-12 text-green-500" />
//                 <h3 className="text-xl font-bold">Custom Dashboards</h3>
//                 <p className="text-center text-gray-500 dark:text-gray-400">
//                   Create personalized dashboards tailored to your specific
//                   business needs.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-4">
//                 <BarChart2 className="h-12 w-12 text-purple-500" />
//                 <h3 className="text-xl font-bold">Advanced Reporting</h3>
//                 <p className="text-center text-gray-500 dark:text-gray-400">
//                   Generate comprehensive reports with just a few clicks, saving
//                   you time and effort.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className=" px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//                   Ready to Get Started?
//                 </h2>
//                 <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
//                   Join thousands of businesses already leveraging our analytics
//                   platform to drive growth.
//                 </p>
//               </div>

//               <SignIn
//                 text="Start Your Free Trial"
//                 icon={<ArrowRight className="ml-2 h-4 w-4" />}
//               />
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-gray-500 dark:text-gray-400">
//           © 2024 Feedlytic. All rights reserved.
//         </p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             Terms of Service
//           </Link>
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             Privacy
//           </Link>
//         </nav>
//       </footer>
//     </div>
//   );
// }

import SignIn from "@/components/SignIn";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Activity, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Comprehensive Analytics for Your Digital Success
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Track page views, analyze user behavior, collect custom
                  events, and gather valuable feedback all in one powerful
                  platform.
                </p>
              </div>
              <div className="flex gap-3">
                <SignIn text="Start Tracking" />
                <Button
                  variant="outline"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Powerful Analytics Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <BarChart2 className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Page View Analytics</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Track and analyze page views, visits, and traffic sources to
                  understand your audience better.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Activity className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-bold">Custom Event Collection</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Define and collect custom events to gain insights into
                  specific user interactions and behaviors.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <MessageSquare className="h-12 w-12 text-purple-500" />
                <h3 className="text-xl font-bold">Feedback Collection</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Gather valuable user feedback to improve your products and
                  services continuously.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Why Choose Our Analytics Platform?
                </h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Our comprehensive solution offers real-time data processing,
                  intuitive dashboards, and powerful reporting tools to help you
                  make data-driven decisions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Easy integration with any website or app
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Customizable dashboards and reports
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    GDPR compliant and privacy-focused
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  alt="Analytics Dashboard"
                  className="rounded-lg object-cover"
                  height="400"
                  src="/placeholder.svg?height=400&width=600"
                  style={{
                    aspectRatio: "600/400",
                    objectFit: "cover",
                  }}
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Gain Valuable Insights?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start collecting analytics, tracking custom events, and
                  gathering feedback today.
                </p>
              </div>
              <SignIn
                text="Get Started for Free"
                icon={<ArrowRight className="ml-2 h-4 w-4" />}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Feedlytic. All rights reserved.
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
