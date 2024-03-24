"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableContactes } from "./_components/contactes/data-table-contactes";
import { columns } from "./_components/contactes/columns";
import {
  getAgences,
  getClientContactes,
  getClientNonContactes,
  getGroupes,
} from "@/actions/client.action";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
    perPage?: string;
    groupe?: string;
    agence?: string;
    to?: string;
    from?: string;
  };
}) {
  const search = searchParams?.query || "";
  const group = searchParams?.groupe || "";
  const agence = searchParams?.agence || "";
  const from = searchParams?.from || "";
  const to = searchParams?.to || "";
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;
  const limit = Number(searchParams?.limit) || 20;

  const data = await getClientNonContactes(
    search,
    currentPage,
    perPage,
    group,
    agence,
    from,
    to
  );
  const groupes = await getGroupes();
  const agences = await getAgences();
  console.log(agences);

  //const data = [];
  return (
    <div>
      <div className="py-6">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"></h1>
        </div>
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <Tabs defaultValue="noncontactes" className="">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="noncontactes">
                Liste des clients non contactés{" "}
              </TabsTrigger>

              <TabsTrigger value="contactes">
                Liste des clients contactés{" "}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="noncontactes">
              <div className="py-6">
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Liste des clients non contactés{" "}
                  </h1>
                </div>
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <DataTableContactes
                    agences={agences}
                    groupes={groupes}
                    total={data.total}
                    totalAccout={data.totalCount}
                    totalPages={data.totalPages}
                    columns={columns}
                    data={data.result}
                    type="noncontactes"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contactes">
              <div className="py-6">
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Liste des clients contactés{" "}
                  </h1>
                </div>
                <div className=" mx-auto px-4 sm:px-6 md:px-8">
                  <DataTableContactes
                    agences={agences}
                    groupes={groupes}
                    total={data.total}
                    totalAccout={data.totalCount}
                    totalPages={data.totalPages}
                    columns={columns}
                    data={data.result}
                    type="noncontactes"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
