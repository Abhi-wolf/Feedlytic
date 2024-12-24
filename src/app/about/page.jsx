import {
  BarChart2,
  Eye,
  Users,
  MessageSquare,
  Zap,
  ArrowRight,
  Activity,
  Globe,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignIn from "@/components/SignIn";

export const metadata = {
  title: "About Our Analytics Platform",
  description:
    "Learn about the powerful features of our comprehensive analytics solution.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        About Our Analytics Platform
      </h1>

      <p className="text-xl mb-12 text-center max-w-3xl mx-auto">
        Our comprehensive analytics solution provides powerful insights into
        your website&apos;s performance, user behavior, and feedback.
        Here&apos;s what you can do with our platform:
      </p>

      <div className="flex flex-row flex-wrap justify-center items-center gap-6">
        <FeatureCard
          icon={<BarChart2 className="h-8 w-8 text-blue-500" />}
          title="Website Management"
          description="Easily manage multiple websites with unique API keys for secure data collection."
        />
        <FeatureCard
          icon={<Eye className="h-8 w-8 text-green-500" />}
          title="Page View Tracking"
          description="Track page views across your website to understand user navigation patterns."
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-yellow-500" />}
          title="Visit Analytics"
          description="Analyze visits and their sources to optimize your marketing efforts."
        />
        <FeatureCard
          icon={<MessageSquare className="h-8 w-8 text-purple-500" />}
          title="Feedback Collection"
          description="Gather valuable user feedback with ratings to improve your services."
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-red-500" />}
          title="Custom Event Tracking"
          description="Define and track custom events to gain insights into specific user interactions."
        />
      </div>

      <div className="mt-12 flex flex-col gap-4 justify-center items-center ">
        <p className="text-xl mb-4">
          Ready to unlock the power of data-driven decision making?
        </p>

        <SignIn
          text="Get Started for Free"
          size="lg"
          icon={<ArrowRight className="ml-2 h-4 w-4" />}
        />
      </div>

      <div className="container mx-auto py-12 px-1 md:px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          How to Use Feedlytic
        </h1>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Globe className="mr-2 h-6 w-6" /> Analytics Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>Add your website in the Feedlytic dashboard.</li>
                <li>Copy the tracking snippet provided for your website.</li>
                <li>
                  Add the snippet to the <code>&lt;head&gt;</code> section of
                  your HTML page:
                </li>
              </ol>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{`<script defer data-domain="your-website.com"
  src="https://feedlytic.vercel.app/tracking-script.js"></script>`}</code>
              </pre>
              <p>
                To track traffic sources, append <code>?utm=source</code> to
                your URLs.
              </p>
              <p>
                Example: <code>https://your-website.com/?utm=facebook</code>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Activity className="mr-2 h-6 w-6" /> Event Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>Generate an API key in your Feedlytic dashboard.</li>
                <li>Use the following code to track events:</li>
              </ol>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{`const apiURL = "https://feedlytic.vercel.app/api/events";
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
    });`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <MessageSquare className="mr-2 h-6 w-6" /> Feedback Collection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Collect feedback using event tracking with a specific event
                name:
              </p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                <code>{`const apiURL = "https://feedlytic.vercel.app/api/events";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer {apiKey}",
};
const feedbackData = {
  userName: "",    // required
  domain: "",      // required
  feedback: "",    // required
  rating: "",      
};

// using axios
const sendRequest = async () => {
  axios
    .post(apiURL, feedbackData, { headers })
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
      body: JSON.stringify(feedbackData), 
    });`}</code>
              </pre>
              <p>
                Implement this code in your feedback form submission handler.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
