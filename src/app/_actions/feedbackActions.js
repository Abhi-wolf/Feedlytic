"use server";

export async function addFeedback(input) {
  try {
    if (!input.userName || !input.feedback) {
      throw new Error("User name and feedback are required");
    }

    if (!process.env.FEEDLYTIC_API_URL) {
      throw new Error("FEEDLYTIC_API_URL is not defined");
    }

    if (!process.env.FEEDLYTIC_API_KEY) {
      throw new Error("FEEDLYTIC_API_KEY is not defined");
    }

    const feedbackData = {
      userName: input.userName,
      domain: process.env.FRONTEND_DOMAIN,
      feedback: input.feedback,
      rating: input.rating,
    };

    const res = await fetch(`${process.env.FEEDLYTIC_API_URL}/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FEEDLYTIC_API_KEY}`,
      },
      body: JSON.stringify(feedbackData),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Website creation error:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
