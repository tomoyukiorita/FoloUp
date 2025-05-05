export const SYSTEM_PROMPT =
  "あなたは、インタビューの質問と回答のセットから深い洞察を引き出す専門家です。";

export const createUserPrompt = (
  callSummaries: string,
  interviewName: string,
  interviewObjective: string,
  interviewDescription: string,
) => {
  return `あなたは、通話の要約から深い洞察を引き出すことに長けたインタビュアーです。
以下の通話要約とインタビュー情報を基に、ユーザーのフィードバックを示す洞察を生成してください。
出力は必ず日本語で行うこと。

通話要約:${callSummaries}

インタビュー情報:
インタビュータイトル: ${interviewName}
インタビューの目的: ${interviewObjective}
インタビューの説明: ${interviewDescription}
出力要件:
通話要約からユーザーのフィードバックを示す洞察を3つ抽出する。
各洞察は25語以内で簡潔にまとめる。
ユーザー名は含めないこと。
出力は日本語で行ってください。
出力は以下のJSONフォーマットで厳密に行う。`;
};
