import { getSession } from "@/lib";
import { getLinksByCodeFonction } from "@/actions/navbar.action";
import { getTranslations } from "next-intl/server";
import Mainlayout from "./access-management/_component/MainLayout";
import { redirect } from "next/navigation";
import { acces } from "@/actions/acess.action";

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
