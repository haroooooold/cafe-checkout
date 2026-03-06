import { IonText, IonButton } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { clearCart } from "../features/cart/cartSlice";
import { calculateTotals } from "../utils/priceCalculator";

export default function Checkout() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const { subTotal = 0, serviceCharge = 0, total = 0 } = calculateTotals(items);

  const handleCheckout = () => {
    const receipt = {
      items,
      subTotal,
      serviceCharge,
      total,
      timestamp: new Date().toISOString(),
    };

    console.log("Processing Receipt:", receipt);
    dispatch(clearCart());
    alert("Order placed successfully!");
  };

  if (items.length === 0) return null;

  return (
    <footer style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
      <div style={{ marginBottom: "12px" }}>
        <div style={rowStyle}>
          <IonText color="medium">Subtotal</IonText>
          <IonText>${subTotal.toFixed(2)}</IonText>
        </div>
        <div style={rowStyle}>
          <IonText color="medium">Service Charge</IonText>
          <IonText>${serviceCharge.toFixed(2)}</IonText>
        </div>
        <div style={{ ...rowStyle, marginTop: "8px" }}>
          <IonText color="dark">
            <strong style={{ fontSize: "1.1rem" }}>Total</strong>
          </IonText>
          <IonText color="primary">
            <strong style={{ fontSize: "1.2rem" }}>${total.toFixed(2)}</strong>
          </IonText>
        </div>
      </div>

      <IonButton
        expand="block"
        color="primary"
        shape="round"
        style={{ height: "48px", fontWeight: "700", "--box-shadow": "none" }}
        onClick={handleCheckout}
      >
        Place Order
      </IonButton>
    </footer>
  );
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "4px",
};
