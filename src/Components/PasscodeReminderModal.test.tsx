import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PasscodeReminderModal from "./PasscodeReminderModal";

const passcode = "quickly-beautiful-elephant";

describe("PasscodeReminderModal", () => {
  it("censors the passcode by default and reveals it on Show", () => {
    render(<PasscodeReminderModal passcode={passcode} onClose={vi.fn()} />);

    expect(screen.queryByText(passcode)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Show"));

    expect(screen.getByText(passcode)).toBeInTheDocument();
    expect(screen.getByText("Hide")).toBeInTheDocument();
  });

  it("copies the passcode to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<PasscodeReminderModal passcode={passcode} onClose={vi.fn()} />);
    fireEvent.click(screen.getByLabelText("Copy passcode"));

    await screen.findByText("Copied!");
    expect(writeText).toHaveBeenCalledWith(passcode);
  });

  it("calls onClose when dismissed", () => {
    const onClose = vi.fn();
    render(<PasscodeReminderModal passcode={passcode} onClose={onClose} />);

    fireEvent.click(screen.getByText("Got it"));

    expect(onClose).toHaveBeenCalled();
  });
});
