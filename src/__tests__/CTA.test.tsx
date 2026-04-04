import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CTA from "@/components/CTA";
import { ModalProvider, useModal } from "@/components/ModalContext";

function ModalSpy() {
  const { modal, selectedPlan } = useModal();
  return (
    <>
      <span data-testid="modal-state">{modal ?? "null"}</span>
      <span data-testid="selected-plan">{selectedPlan}</span>
    </>
  );
}

const renderCTA = () =>
  render(
    <ModalProvider>
      <ModalSpy />
      <CTA />
    </ModalProvider>
  );

describe("CTA", () => {
  it("renders section with id=cta", () => {
    renderCTA();
    expect(document.getElementById("cta")).toBeInTheDocument();
  });

  it("renders heading and subtext", () => {
    renderCTA();
    expect(screen.getByText("Start for free today")).toBeInTheDocument();
    expect(screen.getByText(/Join 10,000\+ remote teams/)).toBeInTheDocument();
    expect(screen.getByText("No credit card required")).toBeInTheDocument();
  });

  it("renders email input and submit button", () => {
    renderCTA();
    expect(
      screen.getByPlaceholderText("Enter your work email")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Get started/i })
    ).toBeInTheDocument();
  });

  it("shows success state immediately after submitting a valid email", () => {
    // setSubmitted(true) is synchronous — no fake timers needed
    renderCTA();
    fireEvent.change(
      screen.getByPlaceholderText("Enter your work email"),
      { target: { value: "user@company.com" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /Get started/i }));
    expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
  });

  it("opens signup modal after 600ms timeout", () => {
    jest.useFakeTimers();
    renderCTA();
    fireEvent.change(
      screen.getByPlaceholderText("Enter your work email"),
      { target: { value: "user@company.com" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /Get started/i }));
    // Success state already shown
    expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
    // Advance the 600ms timeout
    act(() => jest.advanceTimersByTime(600));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("signup");
    expect(screen.getByTestId("selected-plan")).toHaveTextContent("Free");
    jest.useRealTimers();
  });

  it("renders footer disclaimer text", () => {
    renderCTA();
    expect(
      screen.getByText(/Free forever. No spam. Unsubscribe anytime./)
    ).toBeInTheDocument();
  });
});
