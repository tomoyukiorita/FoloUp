import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackData } from "@/types/interface";

enum SatisfactionLevel {
  Positive = "😀",
  Moderate = "😐",
  Negative = "😔",
}

interface FeedbackFormProps {
  onSubmit: (data: Omit<FeedbackData, "interview_id">) => void;
  email: string;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSubmit,
  email,
}) => {
  const [satisfaction, setSatisfaction] = useState<SatisfactionLevel>(
    SatisfactionLevel.Moderate,
  );
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (satisfaction !== null || feedback.trim() !== "") {
      onSubmit({
        satisfaction: Object.values(SatisfactionLevel).indexOf(satisfaction),
        feedback,
        email,
      });
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        Are you satisfied with the platform?
      </h3>
      <div className="flex justify-center space-x-4 mb-4">
        {Object.values(SatisfactionLevel).map((emoji, index) => (
          <button
            key={index}
            onClick={() => setSatisfaction(emoji)}
            className={`text-3xl ${satisfaction === emoji ? "border-2 border-indigo-600" : ""}`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Add your feedback here"
        className="mb-4"
      />
      <Button
        onClick={handleSubmit}
        disabled={satisfaction === null && feedback.trim() === ""}
        className="w-full bg-indigo-600 text-white"
      >
        Submit Feedback
      </Button>
    </div>
  );
};
