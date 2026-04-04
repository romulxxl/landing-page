import React from "react";
import { render, screen } from "@testing-library/react";
import Features from "@/components/Features";

describe("Features", () => {
  it("renders the section with id=features", () => {
    render(<Features />);
    expect(document.getElementById("features")).toBeInTheDocument();
  });

  it("renders section header text", () => {
    render(<Features />);
    expect(screen.getByText("Everything your team needs")).toBeInTheDocument();
    expect(
      screen.getByText(/Flowly combines all the tools/)
    ).toBeInTheDocument();
  });

  it("renders all 6 feature card titles", () => {
    render(<Features />);
    const titles = [
      "Visual Kanban Boards",
      "Team Collaboration",
      "Smart Automations",
      "Powerful Analytics",
      "Built-in Chat",
      "Enterprise Security",
    ];
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders feature descriptions", () => {
    render(<Features />);
    expect(
      screen.getByText(/Organize work visually with drag-and-drop boards/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Invite teammates, assign tasks/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/SOC 2 compliant with SSO/)
    ).toBeInTheDocument();
  });
});
