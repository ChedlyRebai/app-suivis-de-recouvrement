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
  getGroupes,
  getValidationProposeDeTransferAnticipe,
} from "@/actions/client.action";

import { HistoriqueCommentaireColumns } from "./_component/HistoriqueCommentaireColumns";
import { HistoriqueCommentaireDataTable } from "./_component/HistoriqueCommentaireDataTable";
import {
  getHistoriqueDemandDeTransferAnticipe,
  getHistoriquevalidationpropsedetransfertanticipeByCli,
} from "@/actions/dmandeTransfer.action";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    cli?: string;
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
  const cli = searchParams?.cli || "";

  const data: any = await getHistoriquevalidationpropsedetransfertanticipeByCli(
    cli,
    currentPage,
    perPage,
    group,
    agence,
    from,
    to
  );
  //   const dataNon = await getClientNonContactes(
  //     search,
  //     currentPage,
  //     perPage,
  //     group,
  //     agence,
  //     from,
  //     to
  //   );

  //const data: any = [];
  console.log("dataazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
  console.log(data);
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
            <Card>
              <CardHeader>
                <CardTitle>Historique Commentaire</CardTitle>
                {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
              </CardHeader>
              <CardContent>
                <HistoriqueCommentaireDataTable
                  totalAccout={data.totalCount || 0}
                  totalPages={data.totalPages || 1}
                  columns={HistoriqueCommentaireColumns}
                  data={data.result || []}
                />
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
