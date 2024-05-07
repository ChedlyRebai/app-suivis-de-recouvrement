"use client";
import { ab_client } from "@/Models/ab_client.model";
import { Client, Utilisateur, clientResult } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const clientcolumns: ColumnDef<Client>[] = [
    
  {
    accessorKey: "cli",
    header: "cli",
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
    accessorKey: "tel1",
    header: "Telephone 1",
  },
    {
        accessorKey: "tel2",
        header: "Telephone 2",
    },
    {
        accessorKey: "nbre_imp",
        header: "Nombre Impayé",
    },
    {
        accessorKey: "mnt_imp",
        header: "Montant Impayé",
    },
    {
        accessorKey: "nombre_jours",
        header: "Nombre de jours",
    },
    {
        accessorKey: "sd",
        header: "sd",
    },
    {
        accessorKey: "depassement",
        header: "depassement",
    },
    {
        accessorKey: "nombre_jours_sdb",
        header: "nombre_jours_sdb",
    },
];
