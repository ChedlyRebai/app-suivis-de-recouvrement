"use server";
import { getAllFunctions } from "@/actions/fonction.action";
import { columns } from "./_component/columns";
import { AccessManagementDataTable } from "./_component/data-table";
import { getSession } from "@/lib";
import { getTranslations } from "next-intl/server";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    perPage?: string;
  };
}) {
  const search = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;
  const limit = Number(searchParams?.limit) || 20;
  const offset = (currentPage - 1) * limit;
  console.log("se");
  console.log("limi", limit, offset, " c ", currentPage);
  const se = await getSession();

  return (
    <div>
      <div className="py-6">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Access Management
          </h1>
        </div>
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content 
                <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
                {/* /End replace */}
          <AccessManagementDataTable />
        </div>
      </div>
    </div>
  );
}
