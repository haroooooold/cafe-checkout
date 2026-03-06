import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import SearchBar from "../../components/SearchBar";

describe("SearchBar Component", () => {
  const mockOnChange = vi.fn();

  test("renders with the default placeholder", () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    const inputElement = screen.getByPlaceholderText(/search.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("displays the correct value passed via props", () => {
    render(<SearchBar value="Cappuccino" onChange={mockOnChange} />);
    const inputElement = screen.getByPlaceholderText(
      /search.../i,
    ) as HTMLInputElement;

    expect(inputElement.value).toBe("Cappuccino");
  });
});
