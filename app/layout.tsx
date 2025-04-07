import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./Components/ClientLayout";
import Footer from "./Components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thornfield",
  description: "Thornfield Whisky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClientLayout>
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
