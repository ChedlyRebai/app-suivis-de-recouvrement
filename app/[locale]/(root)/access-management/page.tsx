"use server";
import { getAllFunctions } from "@/actions/fonction.action";
import { columns } from "./_component/columns";
import { DataTable } from "./_component/data-table";
import { getSession } from "@/lib";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  console.log("se");
  const se = await getSession();

  return (
    <div>
      <DataTable />
    </div>
  );
}
