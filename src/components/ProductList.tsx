import { useEffect, useState, useMemo } from "react";
import {
  IonContent,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonFab,
  IonFabButton,
  IonBadge,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { searchOutline, cartOutline, closeOutline } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { fetchMenu } from "../features/menu/menuSlice";
import { addItem } from "../features/cart/cartSlice";
import { fuzzySearch } from "../utils/fuzzySearch";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import Cart from "./Cart";
import type { Product } from "../features/menu/types";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((s) => s.menu.products);
  const cartItems = useAppSelector((s) => s.cart.items);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showCartModal, setShowCartModal] = useState(false);

  // Calculate total items for the FAB badge
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const processedProducts = useMemo(() => {
    const filtered = fuzzySearch(products, search);
    return [...filtered].sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return 0;
    });
  }, [products, search, sortBy]);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      }),
    );
  };

  return (
    <IonContent className="ion-padding" style={{ "--background": "#f4f5f8" }}>
      <IonGrid fixed>
        <IonRow>
          {/* Main Product Section: Full width on mobile, 8/12 on desktop */}
          <IonCol size="12" sizeLg="8">
            <header style={{ marginBottom: "24px", paddingLeft: "8px" }}>
              <IonText color="dark">
                <h1 style={{ fontWeight: 800, fontSize: "2.2rem", margin: 0 }}>
                  Menu
                </h1>
                <IonNote style={{ fontSize: "1rem" }}>
                  {processedProducts.length} items available
                </IonNote>
              </IonText>
            </header>

            {/* Responsive Filter Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              <div style={{ flex: "1", minWidth: "250px" }}>
                <SearchBar value={search} onChange={(v) => setSearch(v)} />
              </div>
              <div style={{ width: "160px" }}>
                <SortDropdown onChange={(v) => setSortBy(v)} />
              </div>
            </div>

            <IonRow>
              {processedProducts.length > 0 ? (
                processedProducts.map((product) => (
                  <IonCol size="12" sizeSm="6" key={product.id}>
                    <ProductCard
                      product={product}
                      onAdd={() => handleAddToCart(product)}
                    />
                  </IonCol>
                ))
              ) : (
                <IonCol size="12" className="ion-text-center ion-padding">
                  <IonIcon
                    icon={searchOutline}
                    style={{ fontSize: "64px", color: "#ddd" }}
                  />
                  <p style={{ color: "#999" }}>
                    No products match your search.
                  </p>
                </IonCol>
              )}
            </IonRow>
          </IonCol>

          {/* Sidebar Cart: Visible ONLY on Large screens */}
          <IonCol sizeLg="4" className="ion-hide-lg-down">
            <div style={{ position: "sticky", top: "20px" }}>
              <Cart />
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Floating Action Button: Visible ONLY on Mobile/Tablet */}
      <IonFab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        className="ion-hide-lg-up"
      >
        <IonFabButton onClick={() => setShowCartModal(true)}>
          <IonIcon icon={cartOutline} />
          {totalItems > 0 && <IonBadge color="danger">{totalItems}</IonBadge>}
        </IonFabButton>
      </IonFab>

      <IonModal
        isOpen={showCartModal}
        onDidDismiss={() => setShowCartModal(false)}
        initialBreakpoint={0.75}
        breakpoints={[0, 0.75, 1]}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Your Cart</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowCartModal(false)}>
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <Cart isModal={true} />
        </IonContent>
      </IonModal>
    </IonContent>
  );
}
