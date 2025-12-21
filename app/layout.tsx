import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Berg Game Gallery - 我的游戏收藏",
  description: "展示当前在玩、想要玩、已玩过、不玩了的游戏",
  icons: {
    icon: "/ps5-controller-gamepad-seeklogo.svg",
    shortcut: "/ps5-controller-gamepad-seeklogo.svg",
    apple: "/ps5-controller-gamepad-seeklogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
