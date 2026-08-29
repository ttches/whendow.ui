import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Calendar from "./Calendar";

afterEach(() => {
  vi.useRealTimers();
});

describe("grid generation", () => {
  it("always renders a fixed 6-week (42-cell) grid", () => {
    const { container } = render(
      <Calendar selectedDates={[]} onDateClick={vi.fn()} />,
    );

    expect(container.querySelectorAll(".disabled")).toHaveLength(42);
  });

  it("fills the remaining grid cells with the correct number of out-of-month days", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 1, 1));

    const { container } = render(
      <Calendar selectedDates={[]} onDateClick={vi.fn()} />,
    );

    expect(container.querySelectorAll(".out-of-month")).toHaveLength(13);
  });
});

describe("month navigation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 11, 15));
  });

  it("advances the header label on next-month click", () => {
    render(<Calendar selectedDates={[]} onDateClick={vi.fn()} />);

    expect(screen.getByText("December")).toBeInTheDocument();

    fireEvent.click(screen.getByText(">"));

    expect(screen.getByText("January")).toBeInTheDocument();
  });

  it("rolls the year forward when navigating past December, so leap-year math stays correct", () => {
    const { container } = render(
      <Calendar selectedDates={[]} onDateClick={vi.fn()} />,
    );

    fireEvent.click(screen.getByText(">"));
    fireEvent.click(screen.getByText(">"));

    expect(screen.getByText("February")).toBeInTheDocument();
    expect(container.querySelectorAll(".out-of-month")).toHaveLength(13);
  });

  it("rolls the year backward when navigating before January", () => {
    vi.setSystemTime(new Date(2024, 0, 15));
    render(<Calendar selectedDates={[]} onDateClick={vi.fn()} />);

    expect(screen.getByText("January")).toBeInTheDocument();

    fireEvent.click(screen.getByText("<"));

    expect(screen.getByText("December")).toBeInTheDocument();
  });
});

describe("date selection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 15));
  });

  it("calls onDateClick with the clicked cell's date, regardless of range", () => {
    const onDateClick = vi.fn();
    const { container } = render(
      <Calendar selectedDates={[]} onDateClick={onDateClick} />,
    );

    const dateCells = container.querySelectorAll(".disabled");
    fireEvent.click(dateCells[0]);

    expect(onDateClick).toHaveBeenCalledWith("2023/12/31");
  });

  it("marks the matching cell as selected", () => {
    const { container } = render(
      <Calendar selectedDates={["2024/1/1"]} onDateClick={vi.fn()} />,
    );

    const selectedCells = container.querySelectorAll(".selected");
    expect(selectedCells).toHaveLength(1);
    expect(selectedCells[0]).toHaveTextContent("1");
  });
});
