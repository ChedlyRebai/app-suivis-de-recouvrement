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
import { getAllfiles, getAllfilesByClientId } from "@/actions/file.action";
import { AllFilles } from "../_component/allfiles";
import { filecolumns } from "../_component/fileColumn";
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
  
    const files = await getAllfiles(currentPage, perPage, search);
    
    return (
      <AllFilles
        columns={filecolumns}
        totalPages={files.totalPages || 0}
        data={files.result || []}
      />
    );
  }
  