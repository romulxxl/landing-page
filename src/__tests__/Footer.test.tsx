import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders Flowly brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Flowly")).toBeInTheDocument();
  });

  it("renders brand tagline", () => {
    render(<Footer />);
    expect(
      screen.getByText(/The project management tool built for the way remote teams/)
    ).toBeInTheDocument();
  });

  // Headings have CSS `uppercase` — DOM text is title-case, not uppercase
  it("renders all 4 link group headings", () => {
    render(<Footer />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders Product group links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Features" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Changelog" })).toBeInTheDocument();
  });

  it("renders Company group links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Careers" })).toBeInTheDocument();
  });

  it("renders Legal group links", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: "Privacy Policy" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Terms of Service" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GDPR" })).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Twitter" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "YouTube" })).toBeInTheDocument();
  });

  it("renders current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Flowly, Inc`))
    ).toBeInTheDocument();
  });

  it("renders systems operational status", () => {
    render(<Footer />);
    expect(screen.getByText("All systems operational")).toBeInTheDocument();
  });
});
