import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./Context/LanguageContext";
import Main from "./Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ingame uz",
  description: "This is my portfolio",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Main />
        </LanguageProvider>
      </body>
    </html>
  );
}
