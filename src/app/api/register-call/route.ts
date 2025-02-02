import { NextResponse } from "next/server";
import Retell from "retell-sdk";

const retellClient = new Retell({
  apiKey: process.env.RETELL_API_KEY || "",
});

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const agent_id =
    body.interviewer_id == BigInt(1)
      ? "a21120e6da507422b70fe6ac08cd1986"
      : body.interviewer_id == BigInt(2)
        ? "3e11433523312a0827ebb50805f9f346"
        : "4ea9cb1cfe11a2f874ed1aa5c8022a9e";
  const registerCallResponse = await retellClient.call.register({
    agent_id: agent_id,
    audio_encoding: "s16le",
    audio_websocket_protocol: "web",
    sample_rate: 24000,
    retell_llm_dynamic_variables: body.dynamic_data,
  });

  return NextResponse.json(
    {
      registerCallResponse,
    },
    { status: 200 },
  );
}
