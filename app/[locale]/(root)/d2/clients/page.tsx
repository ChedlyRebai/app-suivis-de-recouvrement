import {
  getAllAccount,
  getAllClient,
  getAllCompteRendu,
  getAllUsers,
} from "@/actions/admin.action";
import React from "react";
import { AllUsers } from "../_component/alllusers";
import { Utilisateurcolumns } from "../_component/Utilisateurcolumns";
import { AllClient } from "../_component/allclient";
import { clientcolumns } from "../_component/ClientColumn";
export default async function Home({
  searchParams,
  children,
}: {
  children: React.ReactNode;
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
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;
  const clients = await getAllClient(currentPage, perPage, search);
  return (
    <AllClient
      columns={clientcolumns}
      totalPages={clients.totalPages}
      data={clients.result}
    />
  );
}
