"use server";
import { getAllFunctions } from "@/actions/fonction.action";
import { columns } from "./_component/columns";
import { DataTable } from "./_component/data-table";
import { getSession } from "@/lib";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  console.log("se");
  const se = await getSession();
  const t = await getTranslations("access-management");
  const lang = {
    searchf: t("searchf"),
    View: t("View"),
    Add: t("Add"),
    Nom: t("Nom"),
    ModuleP: t("ModuleP"),
    Codef: t("Codef"),
    acces: t("Accés"),
    Creat: t("Creat"),
    Modif: t("Modif"),
    Supp: t("Supp"),
  };

  console.log(se);

  return (
    <div>
      <DataTable lang={lang} columns={columns} />
    </div>
  );
}
