import { getAllFunctions } from "@/actions/fonction.action";
import { Payment, columns } from "./_component/columns";
import { DataTable } from "./_component/data-table";

export default async function Page() {
  return (
    <div>
      <DataTable columns={columns} />
    </div>
  );
}
