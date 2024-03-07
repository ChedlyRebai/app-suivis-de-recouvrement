"use client";

import { ThemeProvider } from "next-themes";
const ThemesProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ThemesProviders;
