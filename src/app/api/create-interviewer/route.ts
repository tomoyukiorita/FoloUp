import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const agentResponse = await retellClient.agent.create({
    voice_id: "11labs-Adrian",
    llm_websocket_url: "ws://localhost:3000/api/register-call",
    agent_name: "Interviewer",
  });

  return NextResponse.json(
    {
      agentResponse,
    },
    { status: 200 },
  );
}
