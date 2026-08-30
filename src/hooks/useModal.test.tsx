import { describe, expect, it } from "vitest";
import { act } from "react";
import { render, renderHook, screen } from "@testing-library/react";
import useModal from "./useModal";

describe("useModal", () => {
  it("renders children only after openModal, and hides them after closeModal", () => {
    const { result } = renderHook(() => useModal());

    const { rerender } = render(
      <result.current.Modal>content</result.current.Modal>
    );
    expect(screen.queryByText("content")).not.toBeInTheDocument();

    act(() => result.current.openModal());
    rerender(<result.current.Modal>content</result.current.Modal>);
    expect(result.current.isOpen).toBe(true);
    expect(screen.getByText("content")).toBeInTheDocument();

    act(() => result.current.closeModal());
    rerender(<result.current.Modal>content</result.current.Modal>);
    expect(result.current.isOpen).toBe(false);
    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });
});
