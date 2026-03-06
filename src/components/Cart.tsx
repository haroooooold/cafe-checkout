import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonText,
  IonNote,
} from "@ionic/react";
import {
  addCircleOutline,
  removeCircleOutline,
  cartOutline,
} from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  removeItem,
  updateQuantity,
  type Size,
} from "../features/cart/cartSlice";
import Checkout from "./CheckOut";

interface CartProps {
  isModal?: boolean;
}

export default function Cart({ isModal = false }: CartProps) {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const handleUpdateQty = (
    id: number,
    size: Size | undefined,
    newQty: number,
  ) => {
    newQty > 0
      ? dispatch(updateQuantity({ id, size, quantity: newQty }))
      : dispatch(removeItem(id));
  };

  const containerStyle: React.CSSProperties = {
    background: "white",
    padding: isModal ? "10px" : "24px",
    borderRadius: isModal ? "0" : "20px",
    boxShadow: isModal ? "none" : "0 8px 24px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    maxHeight: isModal ? "100%" : "90vh",
  };

  return (
    <div style={containerStyle}>
      {!isModal && (
        <header style={{ marginBottom: "20px" }}>
          <h2 style={{ fontWeight: 700, margin: 0, fontSize: "1.5rem" }}>
            Your Cart
          </h2>
          <IonNote>{items.length} items</IonNote>
        </header>
      )}

      <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
        {items.length > 0 ? (
          <IonList lines="none">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}`}
                item={item}
                onUpdate={handleUpdateQty}
              />
            ))}
          </IonList>
        ) : (
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <IonIcon
              icon={cartOutline}
              style={{ fontSize: "64px", color: "#f0f0f0" }}
            />
            <p style={{ color: "#999" }}>Items you add will appear here.</p>
          </div>
        )}
      </div>

      <Checkout />
    </div>
  );
}

function CartItem({ item, onUpdate }: { item: any; onUpdate: Function }) {
  return (
    <IonItem style={{ "--padding-start": "0", marginBottom: "8px" }}>
      <IonLabel className="ion-text-wrap">
        <h3 style={{ fontWeight: 600 }}>{item.name}</h3>
        <p>
          Size: <IonText color="medium">{item.size || "Standard"}</IonText>
        </p>
        <p style={{ fontWeight: 700, color: "var(--ion-color-primary)" }}>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </IonLabel>

      <div
        slot="end"
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <IonButton
          fill="clear"
          color="medium"
          size="small"
          onClick={() => onUpdate(item.id, item.size, item.quantity - 1)}
        >
          <IonIcon icon={removeCircleOutline} slot="icon-only" />
        </IonButton>
        <b style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</b>
        <IonButton
          fill="clear"
          color="primary"
          size="small"
          onClick={() => onUpdate(item.id, item.size, item.quantity + 1)}
        >
          <IonIcon icon={addCircleOutline} slot="icon-only" />
        </IonButton>
      </div>
    </IonItem>
  );
}
