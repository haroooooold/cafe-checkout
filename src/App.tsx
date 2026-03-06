import { Provider } from "react-redux";
import { store } from "./app/store";
import ProductList from "./components/ProductList";
import { IonApp, IonContent } from "@ionic/react";

export default function App() {
  return (
    <IonApp>
      <Provider store={store}>
        <IonContent>
          <h1>Cafe Checkout</h1>
          <ProductList />
        </IonContent>
      </Provider>
    </IonApp>
  );
}
