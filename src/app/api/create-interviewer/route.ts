import { logger } from "@/lib/logger";
import { InterviewerService } from "@/services/interviewers.service";
import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export async function GET(res: Response) {
  logger.info("Creating interviewer");
  const newModel = await retellClient.llm.create({
    model: "gpt-4o",
    general_prompt:
      "You are an interviewer who is an expert in asking follow up questions to uncover deeper insights. You have to keep the interview for {{mins}} or short. \n\nThe name of the person you are interviewing is {{name}}. \n\nThe interview objective is {{objective}}.\n\nThese are some of the questions you can ask.\n{{questions}}\n\nOnce you ask a question, make sure you ask a follow up question on it.\n\nFollow the guidlines below when conversing.\n- Follow a professional yet friendly tone.\n- Ask precise and open-ended questions\n- The question word count should be 30 words or less\n- Make sure you do not repeat any of the questions.\n- Do not talk about anything not related to the objective and the given questions.\n- If the name is given, use it in the conversation.",
    general_tools: [
      {
        type: "end_call",
        name: "end_call_1",
        description:
          "End the call if the user uses goodbye phrases such as 'bye,' 'goodbye,' or 'have a nice day.' ",
      },
    ],
  });

  logger.info("New model created", newModel);

  const newFirstAgent = await retellClient.agent.create({
    response_engine: { llm_id: newModel.llm_id, type: "retell-llm" },
    voice_id: "11labs-Chloe",
    agent_name: "Lisa",
  });

  logger.info("New agent created", newFirstAgent);

  const newInterviewer = await InterviewerService.createInterviewer({
    agent_id: newFirstAgent.agent_id,
    name: "Explorer Lisa",
    rapport: 7,
    exploration: 10,
    empathy: 7,
    speed: 5,
    image: "/interviewers/Lisa.png",
    description:
      "Hi! I'm Lisa, an enthusiastic and empathetic interviewer who loves to explore. With a perfect balance of empathy and rapport, I delve deep into conversations while maintaining a steady pace. Let’s embark on this journey together and uncover meaningful insights!",
    audio: "Lisa.wav",
  });

  const newSecondAgent = await retellClient.agent.create({
    response_engine: { llm_id: newModel.llm_id, type: "retell-llm" },
    voice_id: "11labs-Brian",
    agent_name: "Bob",
  });

  const newSecondInterviewer = await InterviewerService.createInterviewer({
    agent_id: newSecondAgent.agent_id,
    name: "Empathetic Bob",
    rapport: 7,
    exploration: 7,
    empathy: 10,
    speed: 5,
    image: "/interviewers/Bob.png",
    description:
      "Hi! I'm Bob, your go-to empathetic interviewer. I excel at understanding and connecting with people on a deeper level, ensuring every conversation is insightful and meaningful. With a focus on empathy, I'm here to listen and learn from you. Let's create a genuine connection!",
    audio: "Bob.wav",
  });

  return NextResponse.json(
    {
      newInterviewer,
      newSecondInterviewer,
    },
    { status: 200 },
  );
}
