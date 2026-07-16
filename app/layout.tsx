import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Berg Game Gallery - 我的游戏档案",
  description: "收藏游戏，也留下真实、无剧透的游玩记录。",
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
      <body>
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
