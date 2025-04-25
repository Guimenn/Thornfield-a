import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import ClientLayout from "./Components/ClientLayout";
import Footer from "./Components/Footer/Footer";
import { Toaster } from 'react-hot-toast';
import ScrollTop from "./Components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thornfield",
  description: "Thornfield Whisky",
  icons: {
    icon: '/Goat.png', // Caminho para o seu favicon na pasta public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>
          {children}
          {typeof window !== 'undefined' && localStorage.getItem('ageVerified') === 'true' && <Footer />}
          <ScrollTop />
        </ClientLayout>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
