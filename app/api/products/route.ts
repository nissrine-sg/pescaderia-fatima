import { NextResponse } from "next/server";
import { listProducts } from "../../../db/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try { return NextResponse.json(await listProducts()); }
  catch { return NextResponse.json([]); }
}
