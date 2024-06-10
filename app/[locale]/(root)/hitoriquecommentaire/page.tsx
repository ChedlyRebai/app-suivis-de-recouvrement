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
import { getHistoriqueDemandDeTransferAnticipe } from "@/actions/dmandeTransfer.action";
import { acccess } from "@/actions/acess.action";
import { redirect } from "next/navigation";

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

  const data: any = await getHistoriqueDemandDeTransferAnticipe(
    cli,
    search,
    currentPage,
    perPage,
    group,
    agence,
    from,
    to
  );
  const accesss = await acccess("hitoriquecommentaire");
  if (accesss.acces === "N") {
    redirect("/forbidden");
  }
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="py-6 mt-16">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"></h1>
        </div>
        <Suspense fallback={<div>Chargement......</div>}>
          <div className=" mx-auto px-4 sm:px-6 md:px-8">
            <Card>
              <CardHeader>
                <CardTitle>Historique </CardTitle>
                {/* <CardDescription>
                  Historique des demandes de transfert anticipé
                </CardDescription> */}
                {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
              </CardHeader>
              <CardContent>
                <HistoriqueCommentaireDataTable
                  access={accesss}
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
