import type { Product } from "../features/menu/types";

export function fuzzySearch(products: Product[], query: string) {
  if (!query) return products;

  const q = query.toLowerCase();

  return products.filter((p) =>
    `${p.title} ${p.price} ${p.category}`.toLowerCase().includes(q),
  );
}
