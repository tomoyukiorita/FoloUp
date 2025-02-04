import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export async function POST(res: Response) {
  console.log("prevAgent");
  const prevAgent = await retellClient.agent.retrieve(
    "a21120e6da507422b70fe6ac08cd1986",
  );

  console.log("prevAgent", prevAgent);

  // const agentResponse = await retellClient.agent.create({
  //   voice_id: "11labs-Adrian",
  //   llm_websocket_url: "ws://localhost:3000/api/register-call",
  //   agent_name: "Interviewer",
  // });

  return NextResponse.json(
    {
      prevAgent,
    },
    { status: 200 },
  );
}
