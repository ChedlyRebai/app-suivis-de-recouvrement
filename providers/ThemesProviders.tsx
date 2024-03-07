"use client";

import { ThemeProvider } from "next-themes";
const ThemesProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemesProviders;
