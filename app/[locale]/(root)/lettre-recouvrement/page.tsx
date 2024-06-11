"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Suspense } from "react";
import { DataTableLettreDeRecouvrement } from "./_components/contactes/data-table-lettre-recouvrement";
import { getLettre } from "@/actions/lettre.action";
import { acccess } from "@/actions/acess.action";
import { redirect } from "next/navigation";

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

  const data = await getLettre(
    search,
    currentPage,
    perPage,
    group,
    agence,
    from,
    to
  );
  console.log("LETTRES RECUPEREES");
  console.log(data);

  const groupes = await getGroupes();
  const agences = await getAgences();
  console.log("render page");
  const access = await acccess("lettre-recouvrement");
  if (access.acces === "N") {
    return redirect("/fr/forbidden");
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
                <CardTitle>Lettre de recouvrement</CardTitle>
                {/*
                <CardDescription>
                Manage your products and view their sales performance.
                </CardDescription>
                */}
              </CardHeader>
              <CardContent>
                <DataTableLettreDeRecouvrement
                  access={access}
                  agences={agences || []}
                  groupes={groupes || []}
                  total={data.total || 0}
                  totalAccout={data.totalCount || 0}
                  totalPages={data.totalPages || 1}
                  columns={columns}
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
