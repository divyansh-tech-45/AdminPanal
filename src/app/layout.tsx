import type { Metadata } from "next";

import "./globals.css";
import { ClientBody } from "./ClientBody";
import { ThemeProvider } from "@/Components/theme-provider";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel build by nextjs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientBody>{children}</ClientBody>
        </ThemeProvider>
      </body>
    </html>
  );
}
