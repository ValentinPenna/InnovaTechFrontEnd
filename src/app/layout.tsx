import type { Metadata } from "next";
import { Rubik, Outfit } from "next/font/google";
import "./reset.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const rubik = Rubik({ subsets: ["latin"], weight: ["500", "700"] });
const outfit = Outfit({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "InnovaTech",
  description: "Los mejores productos de tecnologia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-max h-max">
      <body className="bg-frenchViolet w-full" >
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
