import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import type { Product } from "../features/menu/types";
import Button from "./Button";

interface Props {
  product: Product;
  onAdd: () => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{product.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <Button
          label="Add to Cart"
          onClick={onAdd}
          expand="block"
          color="success"
          size="large"
        />
      </IonCardContent>
    </IonCard>
  );
}
