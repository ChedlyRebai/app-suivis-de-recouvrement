import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  BarChart2Icon,
} from "lucide-react";

import { getSession } from "@/lib";
import { getLinksByCodeFonction } from "@/actions/navbar.action";
import { getTranslations } from "next-intl/server";
import Mainlayout from "./access-management/_component/MainLayout";
import { redirect } from "next/navigation";
import TakePathnameComponent from "@/components/shared/TakePathnameComponent";
import { headers } from "next/headers";
import { acces } from "@/actions/acess.action";
import NotFound from "@/app/not-found";
import ForBidden from "@/app/forbidden";

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function RootLayout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams?: string;
}>) {
  const links = await getLinksByCodeFonction();
  const t = await getTranslations("access-management");
  const session = await getSession();
  const access = await acces();

  if (!session) {
    return redirect("login");
  }
  return (
    <Mainlayout
      showSidebar={false}
      links={links}
      title={t("title")}
      session={session}
    >
      {/* {access ? children : <ForBidden />} */}
      {children}
    </Mainlayout>
  );
}
