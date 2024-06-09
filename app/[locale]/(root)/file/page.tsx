import React from "react";

import {
  getAllfiles,
  getAllfilesByCli,
  getAllfilesByClientId,
} from "@/actions/file.action";
import { FileTable } from "./components/files";
import { filecolumns } from "./components/fileColumn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OpenModelButton from "../d2/client/_component/Documents/openModelButton";
import { DataTableViewOptions } from "@/components/shared/data-table-view-options";

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
  };
}) {
  const search = searchParams?.query || "";
  const group = searchParams?.groupe || "";
  const agence = searchParams?.agence || "";

  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;
  const limit = Number(searchParams?.limit) || 20;

  const data = await getAllfilesByCli(
    Number(searchParams?.cli),
    currentPage,
    perPage
  );

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
              <div className="flex justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Amal hamdy </CardDescription>
                </div>
                <OpenModelButton />
              </div>
            </CardHeader>
            <CardContent>
              <FileTable
                columns={filecolumns}
                totalPages={data.totalPages}
                data={data.result}
              />
            </CardContent>
          </Card>
        </div>

        {/* </Suspense> */}
      </div>
    </div>
  );
}
