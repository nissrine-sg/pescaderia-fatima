"use client";

import { FormEvent, useEffect, useState } from "react";

type Product = { id: number; name: string; type: string; description: string; price: string; image: string; storage: string; preparation: string; status: string; position: number };
const blank = { name: "", type: "Pescado fresco", description: "", price: "", image: "", storage: "Fresco", preparation: "", status: "Disponible", position: 0 };

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(blank);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const response = await fetch("/api/admin/products");
    if (!response.ok) { setAuthenticated(false); setLoading(false); return; }
    setProducts(await response.json()); setAuthenticated(true); setLoading(false);
  };
  useEffect(() => { load().catch(() => setLoading(false)); }, []);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: data.get("username"), password: data.get("password") }) });
    if (!response.ok) { setMessage("Identifiant ou mot de passe incorrect."); return; }
    setMessage(""); setLoading(true); await load();
  };
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const method = editing ? "PUT" : "POST";
    const response = await fetch("/api/admin/products", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing ? { ...form, id: editing.id } : form) });
    const data = await response.json(); if (!response.ok) { setMessage(data.error ?? "Impossible d’enregistrer."); return; }
    setProducts((current) => editing ? current.map((product) => product.id === data.id ? data : product) : [...current, data]); setEditing(null); setForm(blank); setMessage("Enregistré avec succès.");
  };
  const remove = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const response = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (response.ok) { setProducts((current) => current.filter((product) => product.id !== id)); setMessage("Produit supprimé."); }
  };
  const edit = (product: Product) => { setEditing(product); setForm(product); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const update = (key: keyof typeof blank, value: string | number) => setForm((current) => ({ ...current, [key]: value }));
  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); setProducts([]); setMessage(""); };

  if (loading) return <main className="admin-shell"><p>Cargando el espacio administrador…</p></main>;
  if (!authenticated) return <main className="admin-shell"><section className="login-card"><a href="/" className="admin-back">← Volver a la tienda</a><span className="admin-eyebrow">Pescadería Fatima</span><h1>Acceso administrador</h1><p>Gestiona el catálogo, precios y disponibilidad del día.</p><form onSubmit={login}><label>Usuario<input name="username" autoComplete="username" required /></label><label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label><button type="submit">Entrar al panel →</button></form>{message && <p className="admin-message error">{message}</p>}</section></main>;

  return <main className="admin-shell"><header className="admin-header"><a href="/" className="brand"><span className="brand-mark">F</span><span><strong>PESCADERÍA</strong><small>FATIMA · ADMIN</small></span></a><button className="logout" onClick={logout}>Cerrar sesión</button></header><section className="admin-content"><div className="admin-intro"><div><span className="admin-eyebrow">Panel propietario</span><h1>Tu mostrador,<br/><em>siempre al día.</em></h1></div><p>Añade productos, cambia sus fotos mediante una URL, actualiza los precios y controla lo que está disponible hoy.</p></div><section className="product-editor"><div className="editor-title"><div><span>{editing ? "Editar producto" : "Nuevo producto"}</span><small>Los cambios aparecen en la tienda al instante.</small></div>{editing && <button className="cancel" onClick={() => { setEditing(null); setForm(blank); }}>Cancelar</button>}</div><form onSubmit={save} className="admin-form"><div className="admin-form-grid"><label>Nombre<input value={form.name} onChange={(e) => update("name", e.target.value)} required /></label><label>Tipo / categoría<input value={form.type} onChange={(e) => update("type", e.target.value)} required /></label><label>Precio<input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="Ej. 14,90 €/kg" required /></label><label>Estado<select value={form.status} onChange={(e) => update("status", e.target.value)}><option>Disponible</option><option>Últimas unidades</option><option>No disponible</option></select></label></div><label>Descripción<textarea value={form.description} onChange={(e) => update("description", e.target.value)} required /></label><label>URL de la imagen<input value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://…" type="url" required /></label><div className="admin-form-grid"><label>Conservación<input value={form.storage} onChange={(e) => update("storage", e.target.value)} required /></label><label>Preparación<input value={form.preparation} onChange={(e) => update("preparation", e.target.value)} placeholder="Ej. Entera · Fileteada" required /></label></div><button type="submit" className="save-product">{editing ? "Guardar cambios" : "Añadir producto"} →</button></form>{message && <p className="admin-message">{message}</p>}</section><section className="admin-list"><div className="list-heading"><h2>Productos actuales</h2><span>{products.length} productos</span></div>{products.map((product) => <article key={product.id} className="admin-product"><img src={product.image} alt=""/><div><small>{product.type} · {product.status}</small><h3>{product.name}</h3><p>{product.price} · {product.storage}</p></div><div className="row-actions"><button onClick={() => edit(product)}>Editar</button><button className="delete" onClick={() => remove(product.id)}>Eliminar</button></div></article>)}</section></section></main>;
}
