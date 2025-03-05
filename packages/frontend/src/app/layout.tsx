import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { LoginButton } from "@/components/LoginButton";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allo Brain Notes",
  description: "Challenge submission by @samuelhnrq",
};

async function StatusIndicator() {
  const user = await auth();
  return user ? (
    <span>
      Hello {user.user?.name}
      <LogoutButton className="ml-2" />
    </span>
  ) : (
    <LoginButton />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col overflow-clip`}
      >
        <header className="flex justify-between items-center p-4 gap-4 h-16 bg-slate-300">
          <Link href="/" className="text-2xl font-light">
            Notes App
          </Link>
          <StatusIndicator />
        </header>
        {children}
      </body>
    </html>
  );
}
