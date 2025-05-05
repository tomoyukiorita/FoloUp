import { logger } from "@/lib/logger";
import { InterviewerService } from "@/services/interviewers.service";
import { NextResponse, NextRequest } from "next/server";
import Retell from "retell-sdk";
import { INTERVIEWERS, RETELL_AGENT_GENERAL_PROMPT } from "@/lib/constants";

if (!process.env.RETELL_API_KEY) {
  throw new Error('RETELL_API_KEYが設定されていません。');
}

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY,
});

export async function GET(request: NextRequest) {
  logger.info("create-interviewer request received");

  try {
    // Create LLM model
    logger.info("Creating LLM model...");
    const newModel = await retellClient.llm.create({
      model: "gpt-4o",
      general_prompt: RETELL_AGENT_GENERAL_PROMPT,
      general_tools: [
        {
          type: "end_call",
          name: "end_call_1",
          description:
            "End the call if the user uses goodbye phrases such as 'bye,' 'goodbye,' or 'have a nice day.' ",
        },
      ],
    });
    logger.info("LLM model created successfully", { llm_id: newModel.llm_id });

    // Create Lisa
    logger.info("Creating Lisa agent...");
    const newFirstAgent = await retellClient.agent.create({
      response_engine: { llm_id: newModel.llm_id, type: "retell-llm" },
      voice_id: "11labs-Chloe",
      agent_name: "Lisa",
    });
    logger.info("Lisa agent created successfully", { agent_id: newFirstAgent.agent_id });

    logger.info("Creating Lisa interviewer in database...");
    const newInterviewer = await InterviewerService.createInterviewer({
      agent_id: newFirstAgent.agent_id,
      ...INTERVIEWERS.LISA,
    });
    logger.info("Lisa interviewer created successfully", { interviewer: newInterviewer });

    // Create Bob
    logger.info("Creating Bob agent...");
    const newSecondAgent = await retellClient.agent.create({
      response_engine: { llm_id: newModel.llm_id, type: "retell-llm" },
      voice_id: "11labs-Brian",
      agent_name: "Bob",
    });
    logger.info("Bob agent created successfully", { agent_id: newSecondAgent.agent_id });

    logger.info("Creating Bob interviewer in database...");
    const newSecondInterviewer = await InterviewerService.createInterviewer({
      agent_id: newSecondAgent.agent_id,
      ...INTERVIEWERS.BOB,
    });
    logger.info("Bob interviewer created successfully", { interviewer: newSecondInterviewer });

    return NextResponse.json(
      {
        newInterviewer,
        newSecondInterviewer,
      },
      { status: 200 },
    );
  } catch (error: any) {
    logger.error("Error creating interviewers:", {
      error: error,
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      { 
        error: "Failed to create interviewers",
        details: error.message,
        stack: error.stack
      },
      { status: 500 },
    );
  }
}
