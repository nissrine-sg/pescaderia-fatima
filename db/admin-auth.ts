import { env } from "cloudflare:workers";
import { cookies } from "next/headers";

const COOKIE_NAME = "fatima_admin_session";
const MAX_AGE = 60 * 60 * 12;

function settings() {
  const value = env as unknown as { ADMIN_USERNAME?: string; ADMIN_PASSWORD?: string; SESSION_SECRET?: string };
  return { username: value.ADMIN_USERNAME ?? "admin", password: value.ADMIN_PASSWORD ?? "", secret: value.SESSION_SECRET ?? "" };
}

const bytes = new TextEncoder();
const toBase64Url = (value: Uint8Array | string) => btoa(typeof value === "string" ? value : String.fromCharCode(...value)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");

async function signature(payload: string) {
  const key = await crypto.subtle.importKey("raw", bytes.encode(settings().secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, bytes.encode(payload))));
}

export async function validCredentials(username: string, password: string) {
  const config = settings();
  return Boolean(config.password && config.secret && username === config.username && password === config.password);
}

export async function createSession() {
  const payload = toBase64Url(JSON.stringify({ role: "admin", expires: Date.now() + MAX_AGE * 1000 }));
  return `${payload}.${await signature(payload)}`;
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !settings().secret) return false;
  const [payload, received] = token.split(".");
  if (!payload || !received || received !== await signature(payload)) return false;
  try {
    const data = JSON.parse(atob(payload.replaceAll("-", "+").replaceAll("_", "/")));
    return data.role === "admin" && Number(data.expires) > Date.now();
  } catch { return false; }
}

export const adminCookie = (value: string) => ({ name: COOKIE_NAME, value, httpOnly: true, secure: true, sameSite: "strict" as const, path: "/", maxAge: MAX_AGE });
export const clearAdminCookie = { name: COOKIE_NAME, value: "", httpOnly: true, secure: true, sameSite: "strict" as const, path: "/", maxAge: 0 };
