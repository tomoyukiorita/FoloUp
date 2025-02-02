import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const getAllInterviewers = async (clientId: string) => {
  try {
    const { data: defaultData, error: defaultError } = await supabase
      .from("interviewer")
      .select(`*`)
      .filter("agent_id", "eq", "default");

    if (defaultError) {
      console.error("Error fetching default interviewers:", defaultError);
      return [];
    }

    const { data: clientData, error: clientError } = await supabase
      .from("interviewer")
      .select(`*`)
      .filter("agent_id", "eq", clientId);

    if (clientError) {
      console.error(
        `Error fetching interviewers for clientId ${clientId}:`,
        clientError,
      );
      return [];
    }

    return [...(defaultData || []), ...(clientData || [])];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createInterviewer = async (payload: any) => {
  const { error, data } = await supabase
    .from("interviewer")
    .insert({ ...payload });
  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

export const InterviewerService = {
  getAllInterviewers: getAllInterviewers,
  createInterviewer: createInterviewer,
};
