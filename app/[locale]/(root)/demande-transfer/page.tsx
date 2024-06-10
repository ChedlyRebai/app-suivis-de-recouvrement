"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  demandeDeTransferAnticipe,
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
import { Suspense } from "react";

import { DataTableDemandeDeTransfer } from "./_component/demande-transfer-data-table";
import { demandeTransferColumns } from "./_component/demandeTransferColumns";
import DemandeTransfernModal from "@/components/shared/Modals/demande-transfer-Modal";
import { getTypeTransfer } from "@/actions/transfer.action";
import { MOTT } from "@/actions/motif.action";
import { acccess } from "@/actions/acess.action";

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

  const data = await demandeDeTransferAnticipe(
    search,
    currentPage,
    perPage,
    group,
    agence,
    from,
    to
  );
  console.log("data");
  console.log(data);

  const groupes = await getGroupes();
  const agences = await getAgences();

  const motif = await MOTT();
  const typeTransfer = await getTypeTransfer();
  const access = await acccess("demande-transfer");
  const historiqueAccess = await acccess("hitoriquecommentaire");
  console.log(data.result[0] || []);
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="py-6 mt-16">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"></h1>
        </div>
        {/* <Suspense fallback={<div>Chargement......</div>}> */}
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Demande de transfer anticipé</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTableDemandeDeTransfer
                histoariqueAccess={historiqueAccess}
                access={access}
                agences={agences || []}
                groupes={groupes || []}
                total={data.total || 0}
                totalAccout={data.totalCount || 0}
                totalPages={data.totalPages || 1}
                columns={demandeTransferColumns}
                data={data.result || []}
              />
            </CardContent>
          </Card>
        </div>
        <DemandeTransfernModal
          motif={motif || []}
          typeTransfer={typeTransfer || []}
        />
        {/* </Suspense> */}
      </div>
    </div>
  );
}
