import { Metadata } from "next";
import "./globals.css";
import { Funnel_Display } from "next/font/google";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "ProdStation",
  description: "Marketplace to buy products",
};

const AppFont = Funnel_Display({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={AppFont.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
