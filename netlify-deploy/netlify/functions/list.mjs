import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  let body;
  try { body = await req.json(); } catch { return new Response("Bad Request", { status: 400 }); }
  // 管理员账号在服务端校验；可在 Netlify 环境变量 ADMIN_USER / ADMIN_PASS 中修改
  const USER = process.env.ADMIN_USER || "admin";
  const PASS = process.env.ADMIN_PASS || "stewards2026";
  if (!body || body.user !== USER || body.pass !== PASS) return new Response("Unauthorized", { status: 401 });

  const store = getStore({ name: "survey-submissions", consistency: "strong" });
  const records = [];
  let cursor;
  while (true) {
    const page = await store.list(cursor ? { cursor } : {});
    const blobs = page.blobs || [];
    const chunk = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" }).catch(() => null)));
    for (const r of chunk) if (r) records.push(r);
    if (page.cursor) cursor = page.cursor;
    else break;
  }
  records.sort((a, b) => String(a.submittedAt || "").localeCompare(String(b.submittedAt || "")));
  return Response.json(records);
};

export const config = { path: "/api/list" };
