"use client";
import { ab_client } from "@/Models/ab_client.model";
import { client } from "@/actions/client.action";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<client>[] = [
  {
    accessorKey: "cli",
    header: ({ column }) => {
      return (
        <Button variant="ghost">
          Cli
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-xs">
          <span className="text-[0.90rem]">{row.original.nom}</span>
        </div> 
      );
    }
  },

  {
    accessorKey: "groupe",
    header: "Groupe",
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-xs">
          <span className="text-[0.90rem]">{row.original.Zone.codug} : {row.original.Zone.libelle}</span>
        </div>
      
      );
    }
  },

  {
    accessorKey: "agence",
    header: "Agence",
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-xs">
          <span className="text-[0.90rem]">{row.original.Agence.codug} : {row.original.Agence.libelle}</span>
        </div>
      );
    }
  },

  {
    accessorKey: "nbre_imp",
    header: "Nbr.IMP",
  },
  {
    accessorKey: "mnt_imp",
    header: "Impayé",
  },
  {
    accessorKey: "nombre_jours",
    header: "Nbj.Imp",
  },
  {
    accessorKey: "sd",
    header: "Solde Debiteur",
  },
  {
    accessorKey: "depassement",
    header: "Depassement",
  },

  {
    accessorKey: "nombre_jours_sdb",
    header: "Nbj.SDB",
  },

  {
    accessorKey: "tot_creance",
    header: "Tot.irregulier",
  },
  {
    accessorKey: "max_nbj",
    header: "Max NBJ",
  },
  {
    accessorKey: "engagement",
    header: "Engagement",
  },
  {
    accessorKey: "classe",
    header: "Classe",
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
