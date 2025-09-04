// @ts-nocheck
// @vitest-environment jsdom
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePollForm from "./CreatePollForm";

afterEach(() => cleanup());

describe("CreatePollForm - Unit Tests", () => {
  it("shows validation error when title is whitespace and prevents submission", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(<CreatePollForm onCreate={onCreate} />);

    const textboxes = screen.getAllByRole("textbox");
    // 0: title, 1: description, 2: option1, 3: option2
    await user.type(textboxes[0], "   ");
    await user.type(textboxes[2], "Option A");
    await user.type(textboxes[3], "Option B");

    await user.click(screen.getByRole("button", { name: /create poll/i }));

    expect(screen.getByText(/poll title is required\./i)).toBeTruthy();
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("caps added options at 10 total inputs", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();

    render(<CreatePollForm onCreate={onCreate} />);

    const addButton = screen.getByRole("button", { name: /add option/i });
    // We start with 2 options; add 8 more to reach 10
    for (let i = 0; i < 10; i++) {
      await user.click(addButton);
    }
    // Count all textboxes: 0 title, 1 description, then options
    const textboxesAfter = screen.getAllByRole("textbox");
    const optionInputsCount = textboxesAfter.length - 2;
    expect(optionInputsCount).toBe(10);
  });
});

it("submits successfully with valid inputs and settings", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();
  
    render(<CreatePollForm onCreate={onCreate} />);
  
    // Fill in form fields using role-based queries
    const textboxes = screen.getAllByRole("textbox");
    // 0: title, 1: description, 2: option1, 3: option2
    await user.type(textboxes[0], "Favorite Programming Language");
    await user.type(textboxes[1], "Choose the languages you love the most.");
    await user.type(textboxes[2], "TypeScript");
    await user.type(textboxes[3], "Python");
  
    // Switch to Settings tab
    await user.click(screen.getByRole("button", { name: /settings/i }));
  
    // Toggle settings explicitly by label
    await user.click(screen.getByLabelText(/allow users to select multiple options/i));
    await user.click(screen.getByLabelText(/require users to be logged in to vote/i));
  
    // Submit
    await user.click(screen.getByRole("button", { name: /create poll/i }));
  
    // Assertions
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate).toHaveBeenCalledWith({
      title: "Favorite Programming Language",
      description: "Choose the languages you love the most.",
      options: ["TypeScript", "Python"],
      settings: {
        multipleChoice: true,
        requireLogin: false,
        endDate: undefined,
      },
    });
  
    // Make sure no validation error is showing
    expect(screen.queryByText(/required/i)).toBeNull();
  });
  