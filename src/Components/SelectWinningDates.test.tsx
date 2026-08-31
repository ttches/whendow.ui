import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import SelectWinningDates from "./SelectWinningDates";
import { request } from "../api/gql";
import { renderWithClient } from "../test/renderWithClient";

vi.mock("../api/gql", () => ({ request: vi.fn() }));

const mockedRequest = vi.mocked(request);

describe("SelectWinningDates", () => {
  beforeEach(() => {
    mockedRequest.mockReset().mockResolvedValue({
      data: { lockMeeting: { id: "meeting-1", locked: true, winningDates: [] } },
    });

    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 0, 15));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("toggles a date within range and enables the lock-in action", () => {
    renderWithClient(
      <SelectWinningDates
        availabilities={[]}
        endDate="2024/1/31"
        meetingId="meeting-1"
        onSuccess={vi.fn()}
        startDate="2024/1/1"
      />,
    );

    expect(screen.getByText("Tap Winning Date(s)")).toBeInTheDocument();

    const januaryFirstCell = screen.getAllByText("1")[0].closest("div")!;
    fireEvent.click(januaryFirstCell);

    expect(screen.getByText("Lock In Winning Date(s)")).toBeInTheDocument();

    fireEvent.click(januaryFirstCell);
    expect(screen.getByText("Tap Winning Date(s)")).toBeInTheDocument();
  });

  it("ignores clicks on dates outside the meeting's range", () => {
    const { container } = renderWithClient(
      <SelectWinningDates
        availabilities={[]}
        endDate="2024/1/31"
        meetingId="meeting-1"
        onSuccess={vi.fn()}
        startDate="2024/1/1"
      />,
    );

    const outOfRangeCell = container.querySelectorAll("span")[0].closest("div")!;
    fireEvent.click(outOfRangeCell);

    expect(screen.getByText("Tap Winning Date(s)")).toBeInTheDocument();
  });

  it("locks in the selected winning dates", async () => {
    const onSuccess = vi.fn();
    renderWithClient(
      <SelectWinningDates
        availabilities={[]}
        endDate="2024/1/31"
        meetingId="meeting-1"
        onSuccess={onSuccess}
        startDate="2024/1/1"
      />,
    );

    const januaryFirstCell = screen.getAllByText("1")[0].closest("div")!;
    fireEvent.click(januaryFirstCell);

    const lockInButton = screen.getByRole("button", { name: ">" });
    expect(lockInButton).toBeEnabled();

    vi.useRealTimers();
    fireEvent.click(lockInButton);

    await waitFor(() => expect(onSuccess).toHaveBeenCalled());

    expect(mockedRequest).toHaveBeenCalledWith(
      expect.stringContaining("lockMeeting"),
      { input: { meetingId: "meeting-1", winningDates: ["2024/1/1"] } },
    );
  });
});
