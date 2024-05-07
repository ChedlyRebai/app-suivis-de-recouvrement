import {
  getAllAccount,
  getAllClient,
  getAllCompteRendu,
  getAllUsers,
} from "@/actions/admin.action";
import React from "react";
import { AllUsers } from "../_component/alllusers";
import { Utilisateurcolumns } from "../_component/Utilisateurcolumns";
import { AllCompteRendu } from "../_component/alllCompteRendu";
import { compterendutcolumns } from "../_component/compteRenduColumn";
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
  const group = searchParams?.groupe || "";
  const agence = searchParams?.agence || "";

  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;
  const limit = Number(searchParams?.limit) || 20;

  const compterendus = await getAllCompteRendu(currentPage, perPage, search);

  return (
    <AllCompteRendu
      columns={compterendutcolumns}
      totalPages={compterendus.totalPages}
      data={compterendus.CompteRendu}
    />
  );
}
