import { ReactNode } from "react";
import "../styles/globals.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header className="header">
      <h1 style={{ color: "white" }}>Electricity Bill Calculator - CI/CD Test 🚀</h1>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
