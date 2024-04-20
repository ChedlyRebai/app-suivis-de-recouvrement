"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import {
  getAgences,
  getClientContactes,
  getClientNonContactes,
  getGroupes,
} from "@/actions/client.action";
import { demandeTransferColumns } from "./_component/demandeTransferColumns";
import { DataTableDemandeDeTransfer } from "./_component/demande-transfer-data-table";
import { HistoriqueCommentaireColumns } from "./_component/HistoriqueCommentaireColumns";
import { HistoriqueCommentaireDataTable } from "./_component/HistoriqueCommentaireDataTable";

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

  //   const data = await getClientContactes(
  //     search,
  //     currentPage,
  //     perPage,
  //     group,
  //     agence,
  //     from,
  //     to
  //   );

  //   const dataNon = await getClientNonContactes(
  //     search,
  //     currentPage,
  //     perPage,
  //     group,
  //     agence,
  //     from,
  //     to
  //   );

  const data: any = [];

  const groupes = await getGroupes();
  const agences = await getAgences();
  console.log("render page");
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="py-6 mt-16">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"></h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
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
                    <DataTableDemandeDeTransfer
                      agences={agences}
                      groupes={groupes}
                      total={data.total}
                      totalAccout={data.totalCount}
                      totalPages={data.totalPages}
                      columns={HistoriqueCommentaireColumns}
                      data={data.result}
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
                    <HistoriqueCommentaireDataTable
                      columns={HistoriqueCommentaireColumns}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
