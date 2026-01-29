import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // This imports your tailwind styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PriceScope.lk",
  description: "Smart Price Optimizer for Sri Lanka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}