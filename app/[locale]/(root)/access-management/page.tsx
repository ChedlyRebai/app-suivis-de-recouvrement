"use server";
import { getAllFunctions } from "@/actions/fonction.action";
import { Payment, columns } from "./_component/columns";
import { DataTable } from "./_component/data-table";
import { getSession } from "@/lib";

export default async function Page() {
  console.log("se");
  const se = await getSession();
  console.log(se);
  return (
    <div>
      <DataTable columns={columns} />
    </div>
  );
}
