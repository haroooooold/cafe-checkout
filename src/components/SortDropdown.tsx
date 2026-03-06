import { IonSelect, IonSelectOption } from "@ionic/react";

interface Props {
  onChange: (value: string) => void;
}

export default function SortDropdown({ onChange }: Props) {
  return (
    <IonSelect
      placeholder="Sort by"
      onIonChange={(e) => onChange(e.detail.value!)}
    >
      <IonSelectOption value="name">Name</IonSelectOption>
      <IonSelectOption value="price">Price</IonSelectOption>
      <IonSelectOption value="category">Category</IonSelectOption>
    </IonSelect>
  );
}
