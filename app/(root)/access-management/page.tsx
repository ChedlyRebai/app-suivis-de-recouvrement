import { getAllFunctions } from "@/actions/fonction.action";
import { Payment, columns } from "./_component/columns";
import { DataTable } from "./_component/data-table";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

export const revalidate = 0;
export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} />
      </Suspense>
    </div>
  );
}
