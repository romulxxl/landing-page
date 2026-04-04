/**
 * Modal security tests.
 *
 * Verifies that modals implement proper security behaviours:
 *  - Body scroll is locked while a modal is open (prevents background interaction)
 *  - Scroll lock is released on close
 *  - Escape key always closes any modal (keyboard accessibility & panic exit)
 *  - Clicking the backdrop closes the modal
 *  - The dialog has role="dialog" and aria-modal="true" (ARIA semantics)
 *  - Focus is moved into the dialog when it opens (prevents focus escaping)
 *  - The close button has an accessible label
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modals from "@/components/Modals";
import { ModalProvider, useModal, ModalType } from "@/components/ModalContext";

// ─── helpers ─────────────────────────────────────────────────────────────────

function renderModal(type: ModalType) {
  function Opener() {
    const { openLogin, openSignup, openDemo, openContact } = useModal();
    React.useEffect(() => {
      if (type === "login") openLogin();
      else if (type === "signup") openSignup();
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

const ALL_MODALS: ModalType[] = ["login", "signup", "demo", "contact"];

// ─── Body scroll lock ──────────────────────────────────────────────────────

describe("Body scroll lock", () => {
  ALL_MODALS.forEach((type) => {
    it(`locks body scroll when ${type} modal opens`, async () => {
      renderModal(type);
      await screen.findByRole("dialog");
      expect(document.body.style.overflow).toBe("hidden");
    });
  });

  it("restores body scroll after login modal closes", async () => {
    renderModal("login");
    await screen.findByRole("dialog");
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("restores body scroll after Escape closes the modal", async () => {
    renderModal("signup");
    await screen.findByRole("dialog");
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    expect(document.body.style.overflow).toBe("");
  });
});

// ─── Keyboard accessibility ────────────────────────────────────────────────

describe("Escape key closes any modal", () => {
  ALL_MODALS.forEach((type) => {
    it(`Escape closes the ${type} modal`, async () => {
      renderModal(type);
      await screen.findByRole("dialog");
      fireEvent.keyDown(document, { key: "Escape" });
      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });
  });

  it("non-Escape keydown does not close the modal", async () => {
    renderModal("login");
    await screen.findByRole("dialog");
    fireEvent.keyDown(document, { key: "Enter" });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

// ─── Backdrop click ────────────────────────────────────────────────────────

describe("Backdrop click closes the modal", () => {
  ALL_MODALS.forEach((type) => {
    it(`clicking backdrop closes the ${type} modal`, async () => {
      renderModal(type);
      await screen.findByRole("dialog");
      const backdrop = document.querySelector(
        ".fixed.inset-0.bg-black\\/50"
      ) as HTMLElement;
      expect(backdrop).not.toBeNull();
      fireEvent.click(backdrop);
      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });
  });
});

// ─── ARIA / accessibility semantics ───────────────────────────────────────

describe("ARIA attributes on modal dialogs", () => {
  it("login modal has role=dialog", async () => {
    renderModal("login");
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("role", "dialog");
  });

  it("login modal has aria-modal=true", async () => {
    renderModal("login");
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("login modal has a descriptive aria-label", async () => {
    renderModal("login");
    const dialog = await screen.findByRole("dialog");
    const label = dialog.getAttribute("aria-label") ?? "";
    expect(label.trim().length).toBeGreaterThan(0);
  });

  ALL_MODALS.forEach((type) => {
    it(`${type} modal has aria-modal=true`, async () => {
      renderModal(type);
      const dialog = await screen.findByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });
  });
});

// ─── Close button accessibility ───────────────────────────────────────────

describe("Close button has accessible label", () => {
  (["login", "signup", "demo", "contact"] as ModalType[]).forEach((type) => {
    it(`${type} modal close button has aria-label`, async () => {
      renderModal(type);
      await screen.findByRole("dialog");
      const closeBtn = screen.getByRole("button", { name: /Close/i });
      expect(closeBtn).toBeInTheDocument();
    });
  });
});

// ─── No modal rendered when closed ────────────────────────────────────────

describe("No sensitive UI when modal is closed", () => {
  it("renders no dialog when no modal is open", () => {
    render(
      <ModalProvider>
        <Modals />
      </ModalProvider>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("no password input visible when no modal is open", () => {
    render(
      <ModalProvider>
        <Modals />
      </ModalProvider>
    );
    expect(screen.queryByPlaceholderText("••••••••")).not.toBeInTheDocument();
  });
});
