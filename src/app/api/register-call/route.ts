import { logger } from "@/lib/logger";
import { InterviewerService } from "@/services/interviewers.service";
import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export async function POST(req: Request) {
  logger.info("register-call request received");

  const body = await req.json();

  const interviewerId = body.interviewer_id;
  const interviewer = await InterviewerService.getInterviewer(interviewerId);
  
  if (!interviewer || !interviewer.agent_id) {
    logger.error("Interviewer or agent_id not found", { interviewerId });
    
    return NextResponse.json(
      { error: "Interviewer not found" },
      { status: 404 }
    );
  }

  const registerCallResponse = await retellClient.call.createWebCall({
    agent_id: interviewer.agent_id,
    retell_llm_dynamic_variables: body.dynamic_data,
  });

  logger.info("Call registered successfully");
  
  return NextResponse.json(
    {
      registerCallResponse,
    },
    { status: 200 },
  );
}
