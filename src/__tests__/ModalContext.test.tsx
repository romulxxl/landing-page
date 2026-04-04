import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModalProvider, useModal } from "@/components/ModalContext";

function TestConsumer() {
  const { modal, selectedPlan, openLogin, openSignup, openDemo, openContact, close } =
    useModal();
  return (
    <div>
      <span data-testid="modal">{modal ?? "null"}</span>
      <span data-testid="plan">{selectedPlan}</span>
      <button onClick={openLogin}>open-login</button>
      <button onClick={() => openSignup()}>open-signup</button>
      <button onClick={() => openSignup("Pro")}>open-signup-pro</button>
      <button onClick={openDemo}>open-demo</button>
      <button onClick={openContact}>open-contact</button>
      <button onClick={close}>close</button>
    </div>
  );
}

describe("ModalContext", () => {
  it("provides null modal and Free plan as initial state", () => {
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );
    expect(screen.getByTestId("modal")).toHaveTextContent("null");
    expect(screen.getByTestId("plan")).toHaveTextContent("Free");
  });

  it("openLogin sets modal to login", async () => {
    const user = userEvent.setup();
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );
    await user.click(screen.getByText("open-login"));
    expect(screen.getByTestId("modal")).toHaveTextContent("login");
  });

  it("openSignup sets modal to signup with default Free plan", async () => {
    const user = userEvent.setup();
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );
    await user.click(screen.getByText("open-signup"));
    expect(screen.getByTestId("modal")).toHaveTextContent("signup");
    expect(screen.getByTestId("plan")).toHaveTextContent("Free");
  });

  it("openSignup with plan name sets selectedPlan", async () => {
    const user = userEvent.setup();
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );
    await user.click(screen.getByText("open-signup-pro"));
    expect(screen.getByTestId("modal")).toHaveTextContent("signup");
    expect(screen.getByTestId("plan")).toHaveTextContent("Pro");
  });

  it("openDemo sets modal to demo", async () => {
    const user = userEvent.setup();
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );
    await user.click(screen.getByText("open-demo"));
    expect(screen.getByTestId("modal")).toHaveTextContent("demo");
  });

  it("openContact sets modal to contact", async () => {
    const user = userEvent.setup();
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );
    await user.click(screen.getByText("open-contact"));
    expect(screen.getByTestId("modal")).toHaveTextContent("contact");
  });

  it("close resets modal to null", async () => {
    const user = userEvent.setup();
    render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>
    );
    await user.click(screen.getByText("open-login"));
    await user.click(screen.getByText("close"));
    expect(screen.getByTestId("modal")).toHaveTextContent("null");
  });

  it("useModal throws when used outside ModalProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useModal must be used inside ModalProvider"
    );
    spy.mockRestore();
  });
});
