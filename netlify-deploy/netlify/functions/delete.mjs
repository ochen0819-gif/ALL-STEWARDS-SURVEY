import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  let body;
  try { body = await req.json(); } catch { return new Response("Bad Request", { status: 400 }); }
  const USER = "BOSS";
  const PASS = "20262026";
  const u = body && typeof body.user === "string" ? body.user.trim() : "";
  const p = body && typeof body.pass === "string" ? body.pass.trim() : "";
  if (u !== USER || p !== PASS) return new Response("Unauthorized", { status: 401 });

  const store = getStore({ name: "survey-submissions", consistency: "strong" });

  if (body.all === true) {
    let cursor, removed = 0;
    while (true) {
      const page = await store.list(cursor ? { cursor } : {});
      const blobs = page.blobs || [];
      await Promise.all(blobs.map((b) => store.delete(b.key).then(() => { removed++; }).catch(() => null)));
      if (page.cursor) cursor = page.cursor; else break;
    }
    return Response.json({ ok: true, removed });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return new Response("Bad Request", { status: 400 });
  await store.delete(id);
  return Response.json({ ok: true, removed: 1 });
};

export const config = { path: "/api/delete" };
