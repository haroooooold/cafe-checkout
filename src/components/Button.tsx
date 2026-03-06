import { IonButton } from "@ionic/react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
  expand?: "block" | "full" | undefined;
  size?: "small" | "default" | "large";
  fill?: "solid" | "outline" | "clear";
}

export default function Button({
  label,
  onClick,
  color = "primary",
  expand,
  size = "default",
  fill = "solid",
}: ButtonProps) {
  return (
    <IonButton
      color={color}
      expand={expand}
      size={size}
      fill={fill}
      onClick={onClick}
    >
      {label}
    </IonButton>
  );
}
