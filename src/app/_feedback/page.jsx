import AnalayticsHeader from "../../components/analayticsHeader";
import { FeedbackList } from "./feedbackList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeedbacks } from "@/lib/queries/feedbackQueries";

async function FeedbacksPage({ params, data }) {
  const feedbacks = await getFeedbacks({ domain: params.website });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <AnalayticsHeader title="Feedbacks" data={data} />

        <Link href="/sampleFeedback">
          <Button size="sm">Feedback Sample Component</Button>
        </Link>
      </div>
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default FeedbacksPage;
