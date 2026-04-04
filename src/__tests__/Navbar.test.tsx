import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { ModalProvider, useModal } from "@/components/ModalContext";

function ModalSpy() {
  const { modal } = useModal();
  return <span data-testid="modal-state">{modal ?? "null"}</span>;
}

const renderNavbar = () =>
  render(
    <ModalProvider>
      <ModalSpy />
      <Navbar />
    </ModalProvider>
  );

describe("Navbar", () => {
  it("renders Flowly logo text", () => {
    renderNavbar();
    expect(screen.getAllByText("Flowly").length).toBeGreaterThanOrEqual(1);
  });

  it("renders desktop nav links", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: "Features" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();
  });

  it("nav links point to correct anchors", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute(
      "href",
      "#features"
    );
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "#pricing"
    );
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "href",
      "#faq"
    );
  });

  it("Log in button opens login modal", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const loginButtons = screen.getAllByRole("button", { name: /Log in/i });
    await user.click(loginButtons[0]);
    expect(screen.getByTestId("modal-state")).toHaveTextContent("login");
  });

  it("Get Started button opens signup modal", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const getStartedButtons = screen.getAllByRole("button", {
      name: /Get Started/i,
    });
    await user.click(getStartedButtons[0]);
    expect(screen.getByTestId("modal-state")).toHaveTextContent("signup");
  });

  it("mobile menu toggle button is rendered", () => {
    renderNavbar();
    expect(
      screen.getByRole("button", { name: /Open menu/i })
    ).toBeInTheDocument();
  });

  it("clicking mobile toggle shows mobile menu", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /Open menu/i }));
    expect(
      screen.getByRole("button", { name: /Close menu/i })
    ).toBeInTheDocument();
    // Mobile nav links visible
    const mobileLinks = screen.getAllByRole("link", { name: "Features" });
    expect(mobileLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("clicking mobile Log in opens login modal", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByRole("button", { name: /Open menu/i }));
    const logInButtons = screen.getAllByRole("button", { name: /Log in/i });
    await user.click(logInButtons[logInButtons.length - 1]); // mobile button is last
    expect(screen.getByTestId("modal-state")).toHaveTextContent("login");
  });
});
