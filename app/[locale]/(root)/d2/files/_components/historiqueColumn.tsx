"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
export const HistoriqueColumn: ColumnDef<any>[] = [
  // {
  //   accessorKey: "numobs",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         N°
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "ab_client.cli",
    header: "Cli Client",
  },
  {
    accessorKey: "ab_client.nom",
    header: "Non Client",
  },
  {
    accessorKey:
      "Utilisateur_ImpObstransclient_UtilisateurIdToUtilisateur.usr_nomprenom",
    header: "Non utilisateur",
  },

  {
    accessorKey: "procedure",
    header: "Procedure",
  },
  {
    accessorKey: "obs",
    header: "Commentaire",
  },

  {
    accessorKey: "Date saisie",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Saisie
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row?.original?.dateobs);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },

  // {
  //   accessorKey: "VTRF.libelle",
  //   header: "validation",
  // },
  {
    accessorKey: "Motif",
    header: "Motif",
    cell: ({ row }) => {
      return (
        <span>
          {row.original?.Mott?.libelle}
          {row.original?.Proc?.libelle}
        </span>
      );
    },
  },
];
