import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modals from "@/components/Modals";
import { ModalProvider, useModal, ModalType } from "@/components/ModalContext";

/** Renders Modals with a specific modal pre-opened */
function renderModal(type: ModalType, plan?: string) {
  function Opener() {
    const { openLogin, openSignup, openDemo, openContact } = useModal();
    React.useEffect(() => {
      if (type === "login") openLogin();
      else if (type === "signup") openSignup(plan);
      else if (type === "demo") openDemo();
      else if (type === "contact") openContact();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
  }
  return render(
    <ModalProvider>
      <Opener />
      <Modals />
    </ModalProvider>
  );
}

describe("Modals – renders nothing when closed", () => {
  it("renders nothing when modal is null", () => {
    render(
      <ModalProvider>
        <Modals />
      </ModalProvider>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("LoginModal", () => {
  it("renders login dialog", async () => {
    renderModal("login");
    await screen.findByRole("dialog");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Sign in to your account"
    );
  });

  it("renders email and password inputs", async () => {
    renderModal("login");
    await screen.findByRole("dialog");
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("close button closes the modal", async () => {
    renderModal("login");
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("Escape key closes the modal", async () => {
    renderModal("login");
    await screen.findByRole("dialog");
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("submitting form shows demo-mode done state after 1200ms", async () => {
    jest.useFakeTimers();
    renderModal("login");
    await screen.findByRole("dialog");
    // Use fireEvent (sync) to avoid userEvent + fake timer conflicts
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.submit(document.querySelector("form")!);
    act(() => jest.advanceTimersByTime(1200));
    expect(screen.getByText("Demo mode")).toBeInTheDocument();
    jest.useRealTimers();
  });

  it("Sign up free button switches to signup modal", async () => {
    const user = userEvent.setup();
    renderModal("login");
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: /Sign up free/i }));
    await waitFor(() =>
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "Create your account"
      )
    );
  });
});

describe("SignupModal", () => {
  it("renders signup dialog", async () => {
    renderModal("signup");
    await screen.findByRole("dialog");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Create your account"
    );
  });

  it("displays the selected plan name", async () => {
    renderModal("signup", "Pro");
    await screen.findByRole("dialog");
    expect(screen.getByText(/Pro plan selected/)).toBeInTheDocument();
  });

  it("submitting form shows demo-mode done state after 1400ms", async () => {
    jest.useFakeTimers();
    renderModal("signup");
    await screen.findByRole("dialog");
    fireEvent.change(screen.getByPlaceholderText("Jane Smith"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "test@company.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Min. 8 characters"), {
      target: { value: "password123" },
    });
    fireEvent.submit(document.querySelector("form")!);
    act(() => jest.advanceTimersByTime(1400));
    expect(screen.getByText("Demo mode")).toBeInTheDocument();
    jest.useRealTimers();
  });

  it("Log in button switches to login modal", async () => {
    const user = userEvent.setup();
    renderModal("signup");
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: /Log in/i }));
    await waitFor(() =>
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "Sign in to your account"
      )
    );
  });
});

describe("DemoModal", () => {
  it("renders demo dialog", async () => {
    renderModal("demo");
    await screen.findByRole("dialog");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Product demo video"
    );
  });

  it("renders play button", async () => {
    renderModal("demo");
    await screen.findByRole("dialog");
    expect(
      screen.getByRole("button", { name: /Play demo video/i })
    ).toBeInTheDocument();
  });

  it("clicking play shows loading state", async () => {
    const user = userEvent.setup();
    renderModal("demo");
    await screen.findByRole("dialog");
    await user.click(
      screen.getByRole("button", { name: /Play demo video/i })
    );
    expect(screen.getByText(/Loading demo video/)).toBeInTheDocument();
  });

  it("Start for free button closes demo and opens signup", async () => {
    jest.useFakeTimers();
    renderModal("demo");
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: /Start for free/i }));
    await waitFor(() =>
      expect(screen.queryByText("Flowly Product Demo")).not.toBeInTheDocument()
    );
    act(() => jest.advanceTimersByTime(300));
    await waitFor(() =>
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-label",
        "Create your account"
      )
    );
    jest.useRealTimers();
  });
});

describe("ContactModal", () => {
  it("renders contact dialog", async () => {
    renderModal("contact");
    await screen.findByRole("dialog");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Contact sales form"
    );
  });

  it("renders all contact form fields", async () => {
    renderModal("contact");
    await screen.findByRole("dialog");
    expect(screen.getByPlaceholderText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Acme Inc.")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Tell us about your team size/)
    ).toBeInTheDocument();
  });

  it("submitting form shows demo-mode done state after 1400ms", async () => {
    jest.useFakeTimers();
    renderModal("contact");
    await screen.findByRole("dialog");
    fireEvent.change(screen.getByPlaceholderText("Jane Smith"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("you@company.com"), {
      target: { value: "john@company.com" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Tell us about your team size/),
      { target: { value: "We need enterprise." } }
    );
    fireEvent.submit(document.querySelector("form")!);
    act(() => jest.advanceTimersByTime(1400));
    expect(screen.getByText("Demo mode")).toBeInTheDocument();
    jest.useRealTimers();
  });
});
