import { NextResponse } from "next/server";
import { adminCookie, createSession, validCredentials } from "../../../../db/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !await validCredentials(String(body.username ?? ""), String(body.password ?? ""))) return NextResponse.json({ error: "Credenciales incorrectas." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie(await createSession()));
  return response;
}
