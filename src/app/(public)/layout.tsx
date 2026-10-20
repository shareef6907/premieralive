import type { Metadata } from "next";
import "./public.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://premieralive.co"),
};

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
