import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const getAllInterviews = async (userId: string, organizationId: string) => {
  try {
    const { data: clientData, error: clientError } = await supabase
      .from("interview")
      .select(`*`)
      //.filter("user_id", "eq", userId) //Remove this line
      //.filter("organization_id", "eq", organizationId)
      .or(`organization_id.eq.${organizationId},user_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    // const { data: defaultData, error: defaultError } = await supabase
    //   .from("interview")
    //   .select(`*`)
    //   .filter("user_id", "eq", "default")
    //   .order('created_at', { ascending: false });

    return [...(clientData || [])];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getInterviewById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("interview")
      .select(`*`)
      .or(`id.eq.${id},readable_slug.eq.${id}`);

    return data ? data[0] : null;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const updateInterview = async (payload: any, id: string) => {
  const { error, data } = await supabase
    .from("interview")
    .update({ ...payload })
    .eq("id", id);
  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

const deleteInterview = async (id: string) => {
  const { error, data } = await supabase
    .from("interview")
    .delete()
    .eq("id", id);
  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

const getAllRespondents = async (interviewId: string) => {
  try {
    const { data, error } = await supabase
      .from("interview")
      .select(`respondents`)
      .eq("interview_id", interviewId);

    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const InterviewService = {
  getAllInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  getAllRespondents,
};
