import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import ThemeButton from "@/components/shared/ThemeButton";
import { useTranslations } from "next-intl";
import LocalSwitcher from "@/components/shared/Local-switcher";
import Image from "next/image";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations("login");
  return (
    <>
      <div className="hidden">
        <Image
          src="/images/handshake.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/images/handshake.jpg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className="absolute right-4 top-4 md:right-8 md:top-8"
        >
          <Image src="/images/logo.png" width={180} height={143} alt={"logo"} />
        </Link>
        <div className="absolute flex items-center justify-between left-[5%] lg:left-[53%] top-7  md:top-8">
          <LocalSwitcher />
          <div className="mx-1" />
          <ThemeButton />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <Image
            className="absolute inset-0 object-covr bg-zinc-900"
            fill
            src={"/images/handshake.jpg"}
            alt={"test"}
          />
        </div>
        <div className="lg:p-8 w-full">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t("title")}
              </h1>
              <p className="text-sm text-muted-foreground">{t("desc")}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
