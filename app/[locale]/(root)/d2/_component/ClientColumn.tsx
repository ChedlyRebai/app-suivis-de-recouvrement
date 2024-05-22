"use client";
import { ab_client } from "@/Models/ab_client.model";
import { Client, Utilisateur, clientResult } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const clientcolumns: ColumnDef<any>[] = [
  {
    accessorKey: "cli",
    header: "Cli",
  },
  {
    accessorKey: "nom",
    header: "Nom",
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
    accessorKey: "Zone",
    header: "Zone",
    cell: ({ row }) => {
      return (
        <span>
          {`${row.original.Zone.codug} : ${row.original.Zone.libelle}`}{" "}
        </span>
      );
    },
  },

  {
    accessorKey: "nbre_imp",
    header: "Nombre impayé",
  },
  {
    accessorKey: "mnt_imp",
    header: "Montant impayé",
  },
  {
    accessorKey: "nombre_jours",
    header: "Nombre de jours",
  },
  {
    accessorKey: "sd",
    header: "Solde debiteur",
  },
  {
    accessorKey: "depassement",
    header: "Depassement",
  },
  {
    accessorKey: "nombre_jours_sdb",
    header: "Nombre jours sdb",
  },
  {
    accessorKey: "tel1",
    header: "Telephone 1",
  },
  {
    accessorKey: "tel2",
    header: "Telephone 2",
  },
];
