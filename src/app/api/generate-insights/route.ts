import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { ResponseService } from "@/services/responses.service";
import { InterviewService } from "@/services/interviews.service";


export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const responses = await ResponseService.getAllResponses(body.interviewId);
  const interview = await InterviewService.getInterviewById(body.interviewId);

  let callSummaries = "";
  if (responses) {
    responses.forEach((response) => {
      callSummaries += response.details?.call_analysis?.call_summary;
    });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    maxRetries: 5,
    dangerouslyAllowBrowser: true,
  });

  try {
    const prompt = `Imagine you are an interviewer who is an expert in uncovering deeper insights from call summaries.
      Use the list of call summaries and the interview details below to generate insights.
      
      ###
      Call Summaries: ${callSummaries}

      ###
      Interview Title: ${interview.name}
      Interview Objective: ${interview.objective}
      Interview Description: ${interview.description}

      Give 3 insights from the call summaries that highlights user feedback. Only output the insights. Do not include user names in the insights.
      Make sure each insight is 25 words or less.
      
      Output the answer in JSON format with the the key "insights" with an array on 3 insights as the value.`;

    const baseCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in uncovering deeper insights from interview question and answer sets.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const basePromptOutput = baseCompletion.choices[0] || {};
    const content = basePromptOutput.message?.content || "";
    const insightsResponse = JSON.parse(content);

    await InterviewService.updateInterview(
      { insights: insightsResponse.insights },
      body.interviewId,
    );

    return NextResponse.json(
      {
        response: content,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }
}
