import { Star } from "lucide-react";

import { cn, transformTimestamp } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function FeedbackList({ feedbacks }) {
  return (
    <div className="space-y-4 overflow-y-auto">
      {feedbacks?.length === 0 && (
        <div className="w-full text-center my-4 text-red-500 text-md">
          No data found
        </div>
      )}

      {feedbacks?.map((feedback) => (
        <Card key={feedback.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={feedback?.userAvatar}
                    alt={feedback.userName}
                  />
                  <AvatarFallback>
                    {feedback.userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <CardTitle>{feedback.userName}</CardTitle>
                  <CardDescription>
                    <time dateTime={feedback.createdAt}>
                      {transformTimestamp(feedback.createdAt, "MMMM d, yyyy")}
                    </time>
                  </CardDescription>
                </div>
              </div>
              <StarRating rating={feedback.rating} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm  leading-relaxed">{feedback.feedback}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 md:h-6 w-4 md:w-6",
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
};
