"use client";

import { ModalProvider } from "./ModalContext";
import Modals from "./Modals";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      {children}
      <Modals />
    </ModalProvider>
  );
}
