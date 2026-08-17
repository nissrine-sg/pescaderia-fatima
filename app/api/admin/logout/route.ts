import { NextResponse } from "next/server";
import { clearAdminCookie } from "../../../../db/admin-auth";

export async function POST() { const response = NextResponse.json({ ok: true }); response.cookies.set(clearAdminCookie); return response; }
