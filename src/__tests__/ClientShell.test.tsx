import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClientShell from "@/components/ClientShell";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

describe("ClientShell – integration", () => {
  it("renders children", () => {
    render(
      <ClientShell>
        <div data-testid="child">Hello</div>
      </ClientShell>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("Navbar Log in opens LoginModal via shared context", async () => {
    const user = userEvent.setup();
    render(
      <ClientShell>
        <Navbar />
      </ClientShell>
    );
    await user.click(screen.getAllByRole("button", { name: /Log in/i })[0]);
    await screen.findByRole("dialog");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Sign in to your account"
    );
  });

  it("Hero Start for free opens SignupModal via shared context", async () => {
    const user = userEvent.setup();
    render(
      <ClientShell>
        <Hero />
      </ClientShell>
    );
    await user.click(
      screen.getByRole("button", { name: /Start for free/i })
    );
    await screen.findByRole("dialog");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Create your account"
    );
  });

  it("Hero Watch demo opens DemoModal via shared context", async () => {
    const user = userEvent.setup();
    render(
      <ClientShell>
        <Hero />
      </ClientShell>
    );
    await user.click(screen.getByRole("button", { name: /Watch demo/i }));
    await screen.findByRole("dialog");
    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-label",
      "Product demo video"
    );
  });

  it("Escape key closes an open modal", async () => {
    const user = userEvent.setup();
    render(
      <ClientShell>
        <Navbar />
      </ClientShell>
    );
    await user.click(screen.getAllByRole("button", { name: /Log in/i })[0]);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("clicking backdrop closes modal", async () => {
    const user = userEvent.setup();
    render(
      <ClientShell>
        <Navbar />
      </ClientShell>
    );
    await user.click(screen.getAllByRole("button", { name: /Log in/i })[0]);
    await screen.findByRole("dialog");
    // The backdrop is the fixed div behind the dialog
    const backdrop = document.querySelector(".fixed.inset-0.bg-black\\/50");
    if (backdrop) {
      await user.click(backdrop as HTMLElement);
      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    }
  });
});
