import { IonInput } from "@ionic/react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <IonInput
      placeholder={placeholder}
      value={value}
      onIonChange={(e) => onChange(e.detail.value!)}
    />
  );
}
