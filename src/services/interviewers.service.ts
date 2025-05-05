import { createClient } from '@supabase/supabase-js';
import { Interviewer } from "@/types/interviewer";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabaseの環境変数が設定されていません。');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class InterviewerService {
  static async getInterviewers(): Promise<Interviewer[]> {
    const { data, error } = await supabase
      .from("interviewer")
      .select("*")
      .order("id");

    if (error) {
      throw error;
    }

    return data as Interviewer[];
  }

  static async getInterviewer(id: bigint): Promise<Interviewer | null> {
    const { data, error } = await supabase
      .from("interviewer")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data as Interviewer;
  }

  static async createInterviewer(interviewer: Partial<Interviewer>): Promise<Interviewer> {
    const { data, error } = await supabase
      .from("interviewer")
      .insert([interviewer])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return data as Interviewer;
  }

  static async deleteInterviewer(id: bigint): Promise<{ success: boolean; error?: string }> {
    try {
      // まず関連する面接があるかチェック
      const { data: interviews, error: checkError } = await supabase
        .from("interview")
        .select("id")
        .eq("interviewer_id", id);

      if (checkError) {
        throw checkError;
      }

      if (interviews && interviews.length > 0) {
        return {
          success: false,
          error: "この面接官は面接で使用されているため削除できません。先に関連する面接を削除してください。"
        };
      }

      // 面接がない場合のみ削除を実行
      const { error } = await supabase
        .from("interviewer")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error("Error in deleteInterviewer:", error);
      
      return {
        success: false,
        error: "面接官の削除中にエラーが発生しました。"
      };
    }
  }
}
