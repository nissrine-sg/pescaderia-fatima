import { NextResponse } from "next/server";
import { createProduct, deleteProduct, listProducts, updateProduct } from "../../../../db/products";
import { isAdmin } from "../../../../db/admin-auth";

export const dynamic = "force-dynamic";

type ProductPayload = { id?: number; name?: string; type?: string; description?: string; price?: string; image?: string; storage?: string; preparation?: string; status?: string; position?: number };
const required = ["name", "type", "description", "price", "image", "storage", "preparation", "status"] as const;

function normalize(body: ProductPayload) {
  const data = Object.fromEntries(required.map((key) => [key, String(body[key] ?? "").trim()]));
  if (Object.values(data).some((value) => !value)) return null;
  if (!/^https?:\/\//i.test(data.image)) return null;
  return { ...data, position: Number.isFinite(Number(body.position)) ? Number(body.position) : 0 };
}

async function authorized() { return isAdmin(); }
export async function GET() { if (!await authorized()) return NextResponse.json({ error: "No autorizado" }, { status: 401 }); return NextResponse.json(await listProducts()); }
export async function POST(request: Request) { if (!await authorized()) return NextResponse.json({ error: "No autorizado" }, { status: 401 }); const data = normalize(await request.json()); if (!data) return NextResponse.json({ error: "Completa todos los campos; la imagen debe ser una URL." }, { status: 400 }); return NextResponse.json(await createProduct(data), { status: 201 }); }
export async function PUT(request: Request) { if (!await authorized()) return NextResponse.json({ error: "No autorizado" }, { status: 401 }); const body = await request.json() as ProductPayload; const data = normalize(body); if (!data || !Number.isInteger(Number(body.id))) return NextResponse.json({ error: "Datos inválidos." }, { status: 400 }); const product = await updateProduct(Number(body.id), data); return product ? NextResponse.json(product) : NextResponse.json({ error: "Producto no encontrado." }, { status: 404 }); }
export async function DELETE(request: Request) { if (!await authorized()) return NextResponse.json({ error: "No autorizado" }, { status: 401 }); const id = Number(new URL(request.url).searchParams.get("id")); if (!Number.isInteger(id)) return NextResponse.json({ error: "Producto inválido." }, { status: 400 }); await deleteProduct(id); return NextResponse.json({ ok: true }); }
