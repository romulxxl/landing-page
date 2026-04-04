import React from "react";
import { render, screen } from "@testing-library/react";
import SocialProof from "@/components/SocialProof";

describe("SocialProof", () => {
  it("renders trust headline", () => {
    render(<SocialProof />);
    expect(screen.getByText("10,000+ teams use Flowly")).toBeInTheDocument();
  });

  it("renders all 5 company names", () => {
    render(<SocialProof />);
    ["Acmeco", "Globex", "Initech", "Soylent", "Umbrella"].forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("renders stat values", () => {
    render(<SocialProof />);
    expect(screen.getByText("10K+")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
    expect(screen.getByText("50M+")).toBeInTheDocument();
    expect(screen.getByText("4.9/5")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<SocialProof />);
    expect(screen.getByText("Teams worldwide")).toBeInTheDocument();
    expect(screen.getByText("Customer satisfaction")).toBeInTheDocument();
    expect(screen.getByText("Tasks completed")).toBeInTheDocument();
    expect(screen.getByText("Average rating")).toBeInTheDocument();
  });
});
