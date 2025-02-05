export interface Interviewer {
  id: bigint;
  user_id: string;
  created_at: Date;
  name: string;
  rapport: number;
  exploration: number;
  empathy: number;
  speed: number;
  image: string;
  description: string;
  audio: string;
  agent_id: string;
}

export interface User {
  id: string;
  created_at: Date;
  user_id: string;
  image_url: string;
  organization_id: string;
}

export interface Organization {
  id: string;
  created_at: Date;
  image_url: string;
  name: string;
  plan: string;
  allowed_responses_count: number;
}

export interface Question {
  id: string;
  question: string;
  follow_up_count: number;
}

export interface Quote {
  quote: string;
  call_id: string;
}

export interface InterviewBase {
  user_id: string;
  organization_id: string;
  name: string;
  interviewer_id: bigint;
  objective: string;
  question_count: number;
  time_duration: string;
  is_anonymous: boolean;
  questions: Question[];
  description: string;
  response_count: bigint;
}

export interface InterviewDetails {
  id: string;
  created_at: Date;
  url: string | null;
  insights: string[];
  quotes: Quote[];
  details: any;
  is_active: boolean;
  theme_color: string;
  logo_url: string;
  respondents: string[];
  readable_slug: string;
}

export interface Interview extends InterviewBase, InterviewDetails {}

export interface Response {
  id: bigint;
  created_at: Date;
  name: string | null;
  interview_id: string;
  duration: number;
  call_id: string;
  details: any;
  is_analysed: boolean;
  email: string;
  is_ended: boolean;
  is_viewed: boolean;
  analytics: any;
  candidate_status: string;
  tab_switch_count: number;
}

export interface Analytics {
  overallScore: number;
  overallFeedback: string;
  communication: { score: number; feedback: string };
  generalIntelligence: string;
  softSkillSummary: string;
  questionSummaries: Array<{
    question: string;
    summary: string;
  }>;
}

export interface FeedbackData {
  interview_id: string;
  satisfaction: number | null;
  feedback: string | null;
  email: string | null;
}

export interface CallData {
  call_id: string;
  agent_id: string;
  audio_websocket_protocol: string;
  audio_encoding: string;
  sample_rate: number;
  call_status: string;
  end_call_after_silence_ms: number;
  from_number: string;
  to_number: string;
  metadata: Record<string, unknown>;
  retell_llm_dynamic_variables: {
    customer_name: string;
  };
  drop_call_if_machine_detected: boolean;
  opt_out_sensitive_data_storage: boolean;
  start_timestamp: number;
  end_timestamp: number;
  transcript: string;
  transcript_object: {
    role: "agent" | "user";
    content: string;
    words: {
      word: string;
      start: number;
      end: number;
    }[];
  }[];
  transcript_with_tool_calls: {
    role: "agent" | "user";
    content: string;
    words: {
      word: string;
      start: number;
      end: number;
    }[];
  }[];
  recording_url: string;
  public_log_url: string;
  e2e_latency: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
    max: number;
    min: number;
    num: number;
  };
  llm_latency: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
    max: number;
    min: number;
    num: number;
  };
  llm_websocket_network_rtt_latency: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
    max: number;
    min: number;
    num: number;
  };
  disconnection_reason: string;
  call_analysis: {
    call_summary: string;
    user_sentiment: string;
    agent_sentiment: string;
    agent_task_completion_rating: string;
    agent_task_completion_rating_reason: string;
    call_completion_rating: string;
    call_completion_rating_reason: string;
  };
}
