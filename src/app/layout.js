import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// app/layout.js

import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <title>PEOPLE SHOP</title>

        </head>
        <body>
        <AuthProvider>
            <Header />
            <div>{children}</div>
        </AuthProvider>
        </body>
        </html>
    );
}

