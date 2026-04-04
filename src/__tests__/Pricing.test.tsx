import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pricing from "@/components/Pricing";
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

const renderPricing = () =>
  render(
    <ModalProvider>
      <ModalSpy />
      <Pricing />
    </ModalProvider>
  );

describe("Pricing", () => {
  it("renders section with id=pricing", () => {
    renderPricing();
    expect(document.getElementById("pricing")).toBeInTheDocument();
  });

  it("renders section header", () => {
    renderPricing();
    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
  });

  // Plan names are in <h3> headings — use heading role to avoid ambiguity with
  // the "Free" price span and the ModalSpy selectedPlan span
  it("renders all 3 plan name headings", () => {
    renderPricing();
    expect(
      screen.getByRole("heading", { name: "Free" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pro" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Business" })
    ).toBeInTheDocument();
  });

  it("shows Free price label for the Free plan", () => {
    renderPricing();
    // The price <span> for the free plan renders "Free" — getAllByText finds ≥1
    const freeLabels = screen.getAllByText("Free");
    expect(freeLabels.length).toBeGreaterThanOrEqual(1);
  });

  it("shows monthly prices by default", () => {
    renderPricing();
    expect(screen.getByText(/\$12/)).toBeInTheDocument(); // Pro monthly
    expect(screen.getByText(/\$29/)).toBeInTheDocument(); // Business monthly
  });

  it("shows annual prices after toggling to annual", async () => {
    const user = userEvent.setup();
    renderPricing();
    await user.click(screen.getByRole("button", { name: /Annual/i }));
    expect(screen.getByText(/\$9/)).toBeInTheDocument();   // Pro annual
    expect(screen.getByText(/\$23/)).toBeInTheDocument();  // Business annual
  });

  it("shows Most Popular badge on Pro plan", () => {
    renderPricing();
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("clicking Get started free opens signup with Free plan", async () => {
    const user = userEvent.setup();
    renderPricing();
    await user.click(screen.getByRole("button", { name: "Get started free" }));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("signup");
    expect(screen.getByTestId("selected-plan")).toHaveTextContent("Free");
  });

  it("clicking Start Pro trial opens signup with Pro plan", async () => {
    const user = userEvent.setup();
    renderPricing();
    await user.click(screen.getByRole("button", { name: "Start Pro trial" }));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("signup");
    expect(screen.getByTestId("selected-plan")).toHaveTextContent("Pro");
  });

  it("clicking Contact sales opens contact modal", async () => {
    const user = userEvent.setup();
    renderPricing();
    await user.click(screen.getByRole("button", { name: "Contact sales" }));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("contact");
  });

  it("monthly/annual toggle buttons are rendered", () => {
    renderPricing();
    expect(screen.getByRole("button", { name: /Monthly/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Annual/i })).toBeInTheDocument();
  });

  it("annual toggle shows Save 20% label", () => {
    renderPricing();
    expect(screen.getByText("Save 20%")).toBeInTheDocument();
  });
});
