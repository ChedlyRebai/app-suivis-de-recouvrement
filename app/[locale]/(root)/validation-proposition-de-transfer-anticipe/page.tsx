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
import { DataTableValidationDeTransfer } from "./_component/validation-transfer-data-table";
import { validationTransferColumns } from "./_component/validationTransferColumns";
import ValidationTransferModal from "@/components/shared/Modals/validation-transfer-Modal";
import { MOTT, VTRF, getMotifCommercial } from "@/actions/motif.action";

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

  const data = await getValidationProposeDeTransferAnticipe(
    search,
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

  const groupes = await getGroupes();
  const agences = await getAgences();
  const motifs = await MOTT();
  const validationTransfer = await VTRF();
  console.log("render page");
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="py-6 mt-16">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"></h1>
        </div>
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Critére d'integration</CardTitle>
              {/*<CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>*/}
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Chargement....</div>}>
                <DataTableValidationDeTransfer
                  agences={agences || []}
                  groupes={groupes || []}
                  total={data.total || 0}
                  totalAccout={data.totalCount || 0}
                  totalPages={data.totalPages || 1}
                  columns={validationTransferColumns}
                  data={data.result || []}
                />
              </Suspense>
            </CardContent>
          </Card>

          <ValidationTransferModal
            motifs={motifs}
            validationTransfer={validationTransfer}
          />
        </div>
      </div>
    </div>
  );
}
