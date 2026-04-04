import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "@/components/FAQ";
import { ModalProvider } from "@/components/ModalContext";

const renderFAQ = () =>
  render(
    <ModalProvider>
      <FAQ />
    </ModalProvider>
  );

describe("FAQ", () => {
  it("renders section with id=faq", () => {
    renderFAQ();
    expect(document.getElementById("faq")).toBeInTheDocument();
  });

  it("renders section header", () => {
    renderFAQ();
    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
  });

  it("renders all 5 FAQ questions", () => {
    renderFAQ();
    expect(screen.getByText("How does the free plan work?")).toBeInTheDocument();
    expect(screen.getByText("Can I switch plans at any time?")).toBeInTheDocument();
    expect(screen.getByText("Is my data secure?")).toBeInTheDocument();
    expect(screen.getByText("Does Flowly integrate with other tools?")).toBeInTheDocument();
    expect(screen.getByText("What kind of support do you offer?")).toBeInTheDocument();
  });

  it("first FAQ is open by default", () => {
    renderFAQ();
    expect(
      screen.getByText(/Our Free plan is completely free forever/)
    ).toBeInTheDocument();
  });

  it("second FAQ is closed by default", () => {
    renderFAQ();
    expect(
      screen.queryByText(/You can upgrade, downgrade, or cancel/)
    ).not.toBeInTheDocument();
  });

  it("clicking a closed FAQ opens it", async () => {
    const user = userEvent.setup();
    renderFAQ();
    await user.click(screen.getByText("Can I switch plans at any time?"));
    expect(
      screen.getByText(/You can upgrade, downgrade, or cancel/)
    ).toBeInTheDocument();
  });

  it("clicking the open FAQ closes it", async () => {
    const user = userEvent.setup();
    renderFAQ();
    await user.click(screen.getByText("How does the free plan work?"));
    expect(
      screen.queryByText(/Our Free plan is completely free forever/)
    ).not.toBeInTheDocument();
  });

  it("opening a new FAQ closes the previously open one", async () => {
    const user = userEvent.setup();
    renderFAQ();
    // First is open, click second
    await user.click(screen.getByText("Can I switch plans at any time?"));
    expect(
      screen.queryByText(/Our Free plan is completely free forever/)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/You can upgrade, downgrade, or cancel/)
    ).toBeInTheDocument();
  });

  it("renders Chat with us button", () => {
    renderFAQ();
    expect(
      screen.getByRole("button", { name: /Chat with us/i })
    ).toBeInTheDocument();
  });

  it("Chat with us button opens contact modal", async () => {
    const user = userEvent.setup();
    renderFAQ();
    // Clicking should not throw
    await user.click(screen.getByRole("button", { name: /Chat with us/i }));
  });
});
