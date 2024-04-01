import { getLinksByCodeFonction } from "@/actions/navbar.action";
import { getSession } from "@/lib";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Navbar from "./(root)/access-management/_component/MainLayout";
import Mainlayout from "./(root)/access-management/_component/MainLayout";

const Page = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const links = await getLinksByCodeFonction();
  const t = await getTranslations("access-management");
  const session = await getSession();

  
  return (
    <Mainlayout showSidebar links={links} title={t("title")} session={session}>
      {children}
    </Mainlayout>
  );
};

export default Page;
