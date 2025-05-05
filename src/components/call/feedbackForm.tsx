import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackData } from "@/types/response";

enum SatisfactionLevel {
  Positive = "😀",
  Moderate = "😐",
  Negative = "😔",
}

interface FeedbackFormProps {
  onSubmit: (data: Omit<FeedbackData, "interview_id">) => void;
  email: string;
}

export function FeedbackForm({ onSubmit, email }: FeedbackFormProps) {
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
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">プラットフォームに満足しましたか？</h2>
      <div className="flex justify-center gap-4">
        {Object.values(SatisfactionLevel).map((emoji) => (
          <div
            key={emoji}
            className={`cursor-pointer p-2 ${
              satisfaction === emoji ? "border-2 border-indigo-600 rounded-lg" : ""
            }`}
            onClick={() => setSatisfaction(emoji)}
          >
            {emoji}
          </div>
        ))}
      </div>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="フィードバックを入力してください"
        className="w-full h-32 p-2 border rounded-md"
      />
      <Button
        className="bg-indigo-600 hover:bg-indigo-800 text-white"
        onClick={handleSubmit}
      >
        フィードバックを送信
      </Button>
    </div>
  );
}
