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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const data = await getClientContactes(
    search,
    currentPage,
    perPage,
    group,
    agence,
    from,
    to
  );

  const dataNon = await getClientNonContactes(
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

  return (
    <div className="bg-muted/40">
      <div className="py-6 mt-9">
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
              <Card>
                <CardHeader>
                  <CardTitle>Liste des clients Non contactés</CardTitle>
                  {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <DataTableContactes
                    agences={agences}
                    groupes={groupes}
                    total={dataNon.total}
                    totalAccout={dataNon.totalCount}
                    totalPages={dataNon.totalPages}
                    columns={columns}
                    data={dataNon.result}
                    type="noncontactes"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contactes">
              <Card>
                <CardHeader>
                  <CardTitle>Liste des clients contactés</CardTitle>
                  {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
