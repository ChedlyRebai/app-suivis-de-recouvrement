import { getLinksByCodeFonction } from "@/actions/navbar.action";
import { getSession } from "@/lib";
import { getTranslations } from "next-intl/server";
import Mainlayout from "./(root)/access-management/_component/MainLayout";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
// Define the props for the Page component
// interface PageProps {
//   children: ReactNode;
// }

const Page = async () => {
  const links = await getLinksByCodeFonction();
  const t = await getTranslations("access-management");
  const session = await getSession();

  if (!session) {
    return redirect("login");
  }

  return (
    <Mainlayout
      showSidebar
      links={links || []}
      title={"t"}
      session={session || {}}
    ></Mainlayout>
  );
};

export default Page;
