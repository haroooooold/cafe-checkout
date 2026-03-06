import type { Product } from "../features/menu/types";

export function removeDuplicates(products: Product[]): Product[] {
  const map = new Map<string, Product>();

  products.forEach((p) => {
    const key = `${p.title}-${p.price}-${p.category}`;
    map.set(key, p);
  });

  return Array.from(map.values());
}
