import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio OS",
  description: "Internal agency operations platform",
  manifest: "/manifest.json",
  appleWebApp: { capable: false, statusBarStyle: "black-translucent", title: "Studio OS" },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png" }, { url: "/icon-512.png", sizes: "512x512" }],
    apple: [{ url: "/icon-192.png" }, { url: "/icon-512.png" }],
  },
  robots: { index: false, follow: false, nocache: true },
};
export const viewport: Viewport = {
  themeColor: "#0E1116", width: "device-width", initialScale: 1, maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex,nofollow" />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html:
          `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});}`
        }} />
      </body>
    </html>
  );
}
