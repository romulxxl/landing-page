"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ModalType = "login" | "signup" | "demo" | "contact" | null;

interface ModalContextValue {
  modal: ModalType;
  selectedPlan: string;
  openLogin: () => void;
  openSignup: (plan?: string) => void;
  openDemo: () => void;
  openContact: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedPlan, setSelectedPlan] = useState("Free");

  return (
    <ModalContext.Provider
      value={{
        modal,
        selectedPlan,
        openLogin: () => setModal("login"),
        openSignup: (plan = "Free") => { setSelectedPlan(plan); setModal("signup"); },
        openDemo: () => setModal("demo"),
        openContact: () => setModal("contact"),
        close: () => setModal(null),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
