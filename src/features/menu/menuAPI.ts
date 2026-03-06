import type { Product } from "./types";

export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products.map((p: Product) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
  }));
}
