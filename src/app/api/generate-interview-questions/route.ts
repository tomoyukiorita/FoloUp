import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const context = body.context;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    maxRetries: 5,
    dangerouslyAllowBrowser: true,
  });

  try {
    const prompt = `Imagine you are an interviewer specialized in designing interview questions to help hiring managers find candidates with strong technical expertise and project experience, making it easier to identify the ideal fit for the role.
              
              Interview Title: ${body.name}
              Interview Objective: ${body.objective}

              Number of questions to be generated: ${body.number}

              Follow these detailed guidelines when crafting the questions:
              - Focus on evaluating the candidate’s technical knowledge and their experience working on relevant projects. Questions should aim to gauge depth of expertise, problem-solving ability, and hands-on project experience. These aspects carry the most weight.
              - Include questions designed to assess problem-solving skills through practical examples. For instance, how the candidate has tackled challenges in previous projects, and their approach to complex technical issues.
              - Soft skills such as communication, teamwork, and adaptability should be addressed, but given less emphasis compared to technical and problem-solving abilities.
              - Maintain a professional yet approachable tone, ensuring candidates feel comfortable while demonstrating their knowledge.
              - Ask concise and precise open-ended questions that encourage detailed responses. Each question should be 30 words or less for clarity.

              Use the following context to generate the questions:
              ${context}

              Moreover generate a 50 word or less second-person description about the interview to be shown to the user. It should be in the field 'description'.
              Do not use the exact objective in the description. Remember that some details are not be shown to the user. It should be a small description for the
              user to understand what the content of the interview would be. Make sure it is clear to the respondent who's taking the interview.
              
              The field 'questions' should take the format of an array of objects with the following key: question. 
              
              Strictly output only a JSON object with the keys 'questions' and 'description'.`;

    const baseCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in coming up with follow up questions to uncover deeper insights.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const basePromptOutput = baseCompletion.choices[0] || {};
    const content = basePromptOutput.message?.content;

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
