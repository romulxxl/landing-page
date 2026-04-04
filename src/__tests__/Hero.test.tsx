import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Hero from "@/components/Hero";
import { ModalProvider, useModal } from "@/components/ModalContext";

function ModalSpy() {
  const { modal } = useModal();
  return <span data-testid="modal-state">{modal ?? "null"}</span>;
}

const renderHero = () =>
  render(
    <ModalProvider>
      <ModalSpy />
      <Hero />
    </ModalProvider>
  );

describe("Hero", () => {
  it("renders main headline", () => {
    renderHero();
    expect(screen.getByText(/Manage projects/)).toBeInTheDocument();
    expect(screen.getByText(/without the chaos/)).toBeInTheDocument();
  });

  it("renders subheadline", () => {
    renderHero();
    expect(
      screen.getByText(/Flowly brings your remote team together/)
    ).toBeInTheDocument();
  });

  it("renders AI badge", () => {
    renderHero();
    expect(
      screen.getByText(/Now with AI-powered task suggestions/)
    ).toBeInTheDocument();
  });

  it("renders Start for free button", () => {
    renderHero();
    expect(
      screen.getByRole("button", { name: /Start for free/i })
    ).toBeInTheDocument();
  });

  it("renders Watch demo button", () => {
    renderHero();
    expect(
      screen.getByRole("button", { name: /Watch demo/i })
    ).toBeInTheDocument();
  });

  it("Start for free button opens signup modal", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.click(screen.getByRole("button", { name: /Start for free/i }));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("signup");
  });

  it("Watch demo button opens demo modal", async () => {
    const user = userEvent.setup();
    renderHero();
    await user.click(screen.getByRole("button", { name: /Watch demo/i }));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("demo");
  });

  it("renders social proof mini text", () => {
    renderHero();
    expect(screen.getByText(/Trusted by/)).toBeInTheDocument();
    expect(screen.getByText(/10,000\+/)).toBeInTheDocument();
  });

  it("renders dashboard mockup columns", () => {
    renderHero();
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders dashboard stat cards", () => {
    renderHero();
    expect(screen.getByText("Active Tasks")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("In Review")).toBeInTheDocument();
    expect(screen.getByText("Team Members")).toBeInTheDocument();
  });
});
