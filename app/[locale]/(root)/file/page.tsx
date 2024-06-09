import React from "react";

import { getAllfiles } from "@/actions/file.action";
import { FileTable } from "./components/files";
import { filecolumns } from "./components/fileColumn";

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
  };
}) {
  const search = searchParams?.query || "";
  const group = searchParams?.groupe || "";
  const agence = searchParams?.agence || "";

  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;
  const limit = Number(searchParams?.limit) || 20;

  const files = await getAllfiles(currentPage, perPage, search);

  return (
    <FileTable
      columns={filecolumns}
      totalPages={files.totalPages || 0}
      data={files.result || []}
    />
  );
}
