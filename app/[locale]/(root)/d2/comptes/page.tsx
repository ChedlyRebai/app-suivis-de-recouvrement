import {
  getAllAccount,
  getAllClient,
  getAllCompteRendu,
  getAllUsers,
} from "@/actions/admin.action";
import React from "react";
import { AllUsers } from "../_component/alllusers";
import { Utilisateurcolumns } from "../_component/Utilisateurcolumns";
import { AllAccount } from "../_component/alllAccount";
import { comptecolumns } from "../_component/compteColumn";
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

  const users = await getAllUsers(currentPage, perPage, search);
  const clients = await getAllClient(currentPage, perPage, search);
  const compterendus = await getAllCompteRendu(currentPage, perPage, search);
  const comptes = await getAllAccount(currentPage, perPage, search);
  console.log(users);
  return (
    <AllAccount
      columns={comptecolumns}
      totalPages={comptes.totalPages}
      data={comptes.result}
    />
  );
}
