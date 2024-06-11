"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import { Total } from "@/actions/lettre.action";
import { acccess } from "@/actions/acess.action";
import { DataTableContactes } from "../listeclient/_components/contactes/data-table-contactes";
import { columns } from "../listeclient/_components/contactes/columns";

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

  const access = await acccess("listeclient");
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="py-6 mt-16">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white"></h1>
        </div>
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Liste des clients Non contactés</CardTitle>
              {/* <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription> */}
            </CardHeader>
            <CardContent>
              <DataTableContactes
                access={access}
                agences={agences || []}
                groupes={groupes || []}
                total={dataNon.total || ({} as Total)}
                totalAccout={dataNon.totalCount || 0}
                totalPages={dataNon.totalPages || 0}
                columns={columns || []}
                data={dataNon.result || []}
                type="contactes"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
