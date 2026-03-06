interface Cartitem {
  price: number;
  quantity: number;
}

interface TotalOrder {
  subTotal: number;
  serviceCharge: number;
  total: number;
}

export function calculateTotals(items: Cartitem[]): TotalOrder {
  const subTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const serviceCharge = subTotal * 0.1;
  const total = subTotal + serviceCharge;

  return { subTotal, serviceCharge, total };
}
