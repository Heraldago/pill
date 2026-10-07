import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herald | Product Designer",
  description: "Portfolio of Herald - Product Designer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full w-full font-sans">{children}</body>
    </html>
  );
}
