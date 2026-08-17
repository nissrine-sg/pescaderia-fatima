import { env } from "cloudflare:workers";

export type Product = {
  id: number;
  name: string;
  type: string;
  description: string;
  price: string;
  image: string;
  storage: string;
  preparation: string;
  status: string;
  position: number;
};

type ProductInput = Omit<Product, "id" | "position"> & { position?: number };

function database(): D1Database {
  if (!env.DB) throw new Error("La base de datos no está disponible.");
  return env.DB;
}

export async function listProducts(): Promise<Product[]> {
  const result = await database().prepare("SELECT id, name, type, description, price, image, storage, preparation, status, position FROM products ORDER BY position ASC, id ASC").all<Product>();
  return result.results;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const db = database();
  const next = await db.prepare("SELECT COALESCE(MAX(position), -1) + 1 AS value FROM products").first<{ value: number }>();
  const result = await db.prepare("INSERT INTO products (name, type, description, price, image, storage, preparation, status, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(input.name, input.type, input.description, input.price, input.image, input.storage, input.preparation, input.status, input.position ?? next?.value ?? 0).run();
  const product = await db.prepare("SELECT id, name, type, description, price, image, storage, preparation, status, position FROM products WHERE id = ?").bind(result.meta.last_row_id).first<Product>();
  if (!product) throw new Error("No se pudo crear el producto.");
  return product;
}

export async function updateProduct(id: number, input: ProductInput): Promise<Product | null> {
  const db = database();
  await db.prepare("UPDATE products SET name = ?, type = ?, description = ?, price = ?, image = ?, storage = ?, preparation = ?, status = ?, position = ? WHERE id = ?")
    .bind(input.name, input.type, input.description, input.price, input.image, input.storage, input.preparation, input.status, input.position ?? 0, id).run();
  return db.prepare("SELECT id, name, type, description, price, image, storage, preparation, status, position FROM products WHERE id = ?").bind(id).first<Product>();
}

export async function deleteProduct(id: number) {
  await database().prepare("DELETE FROM products WHERE id = ?").bind(id).run();
}
