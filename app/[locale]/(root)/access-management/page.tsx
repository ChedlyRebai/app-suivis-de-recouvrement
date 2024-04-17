"use server";
import { AccessManagementDataTable } from "./_component/data-table";
import { getSession } from "@/lib";
import { redirect } from "next/navigation";

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
  
  const session=await getSession();
  
  if(!session){
    return redirect("login");
  }

  return (
    <div>
      <div className="py-6 mt-16">
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
