"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Interviewer } from "@/types/interviewer";
import { InterviewerService } from "@/services/interviewers.service";
import { useClerk } from "@clerk/nextjs";

interface InterviewerContextProps {
  interviewers: Interviewer[];
  interviewersLoading: boolean;
  fetchInterviewers: () => Promise<void>;
}

const InterviewerContext = createContext<InterviewerContextProps>({
  interviewers: [],
  interviewersLoading: true,
  fetchInterviewers: async () => {},
});

export function InterviewerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const { user } = useClerk();
  const [interviewersLoading, setInterviewersLoading] = useState(true);

  const fetchInterviewers = async () => {
    try {
      setInterviewersLoading(true);
      const data = await InterviewerService.getInterviewers();
      setInterviewers(data);
    } catch (error) {
      console.error("Error fetching interviewers:", error);
    } finally {
      setInterviewersLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchInterviewers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <InterviewerContext.Provider
      value={{ interviewers, interviewersLoading, fetchInterviewers }}
    >
      {children}
    </InterviewerContext.Provider>
  );
}

export const useInterviewers = () => useContext(InterviewerContext);
