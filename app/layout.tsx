import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Herald | Product Designer",
  description: "Portfolio of Herald - Product Designer",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased bg-[#091b2e]">
      <body className="h-full w-full font-sans bg-[#091b2e] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
