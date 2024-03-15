/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
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
import { useTranslations } from "next-intl";
import Mainlayout from "./access-management/_component/MainLayout";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: InboxIcon, current: false },
  { name: "Reports", href: "#", icon: BarChart2Icon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = await getLinksByCodeFonction();
  const t = await getTranslations("access-management");
  const session = await getSession();

  return (
    <Mainlayout
      showSidebar={false}
      links={links}
      title={t("title")}
      session={session}
    >
      {children}
    </Mainlayout>
  );
}
