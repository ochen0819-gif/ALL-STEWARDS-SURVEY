import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  let payload;
  try { payload = await req.json(); } catch { return new Response("Bad Request", { status: 400 }); }
  if (!payload || typeof payload !== "object" || typeof payload.answers !== "object" || payload.answers === null) {
    return new Response("Invalid payload", { status: 400 });
  }
  const id = "sub_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
  // 匿名设计：只保存答案、分支和服务器时间，不记录 IP / 设备 / 任何身份信息
  const record = {
    id,
    submittedAt: new Date().toISOString(),
    branch: typeof payload.branch === "string" ? payload.branch.slice(0, 10) : "OTHER",
    answers: payload.answers,
  };
  const store = getStore({ name: "survey-submissions", consistency: "strong" });
  await store.setJSON(id, record);
  return Response.json({ ok: true });
};

export const config = { path: "/api/submit" };
