"use client";
import { ab_client } from "@/Models/ab_client.model";
import { Client, Compte, Utilisateur, clientResult } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const comptecolumns: ColumnDef<Compte>[] = [
  {
    accessorKey: "cli",
    header: "cli",
  },
  {
    accessorKey: "ncp",
    header: "N° Compte",
  },
  {
    accessorKey: "ab_client.nom",
    header: "Nom de client",
  },
  {
    accessorKey: "Agence",
    header: "Agence",
    cell: ({ row }) => {
      return (
        <span>
          {`${row.original.Agence.codug} : ${row.original.Agence.libelle}`}{" "}
        </span>
      );
    },
  },

  {
    accessorKey: "mnt_imp",
    header: "Montant impayé",
  },

  {
    accessorKey: "mnt_imp",
    header: "Montant solde debiteur", 
  },


 
];
