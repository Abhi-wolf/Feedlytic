import AnalayticsHeader from "../../components/analayticsHeader";
import { FeedbackList } from "./feedbackList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeedbacks } from "@/lib/queries/feedbackQueries";
import LoginPrompt from "@/components/loginPrompt";
import { auth } from "@/auth";

async function FeedbacksPage({ params, data, dateRange }) {
  const session = await auth();
  const feedbacks = await getFeedbacks({ domain: params.website, dateRange });

  if (!session?.user) {
    return <LoginPrompt />;
  }
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <AnalayticsHeader title="Feedbacks" data={data} params={params} />

        <Link href="/sampleFeedback">
          <Button size="sm">Feedback Sample Component</Button>
        </Link>
      </div>
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default FeedbacksPage;
