"use client";

import { ThemeProvider } from "next-themes";
const ThemesProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
};

export default ThemesProviders;
