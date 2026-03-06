import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../components/Button";

describe("Button Component", () => {
  const defaultProps = {
    label: "Click Me",
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the button with the correct label", () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const { container } = render(<Button {...defaultProps} />);
    const ionButton = container.querySelector("ion-button");

    if (ionButton) {
      fireEvent.click(ionButton);
    }

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
