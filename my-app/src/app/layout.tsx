import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import  AuthProvider  from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes"
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mystremesage",
  description: "Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          <Navbar />
          <Toaster />
          
          {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}