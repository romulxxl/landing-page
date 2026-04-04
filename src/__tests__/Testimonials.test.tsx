import React from "react";
import { render, screen } from "@testing-library/react";
import Testimonials from "@/components/Testimonials";

describe("Testimonials", () => {
  it("renders section header", () => {
    render(<Testimonials />);
    expect(screen.getByText("Loved by teams everywhere")).toBeInTheDocument();
    expect(screen.getByText(/Don't just take our word for it/i)).toBeInTheDocument();
  });

  it("renders all 3 testimonial authors", () => {
    render(<Testimonials />);
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Rodriguez")).toBeInTheDocument();
    expect(screen.getByText("Priya Kapoor")).toBeInTheDocument();
  });

  it("renders author positions", () => {
    render(<Testimonials />);
    expect(
      screen.getByText("Engineering Manager at Nova Labs")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Head of Product at Stackify")
    ).toBeInTheDocument();
    expect(
      screen.getByText("CTO at Luminary.io")
    ).toBeInTheDocument();
  });

  it("renders testimonial quotes", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/Flowly completely transformed how our distributed team works/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/automation features alone saved us 10\+ hours/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We evaluated 8 tools before choosing Flowly/)
    ).toBeInTheDocument();
  });

  it("renders star ratings (5 stars per testimonial = 15 stars total)", () => {
    render(<Testimonials />);
    // Each testimonial has 5 stars, 3 testimonials = 15 stars
    const stars = document.querySelectorAll("svg.lucide-star");
    expect(stars.length).toBe(15);
  });
});
