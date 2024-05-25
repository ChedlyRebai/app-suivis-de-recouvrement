"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
export const HistoriqueCommentaireColumns: ColumnDef<any>[] = [
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
    accessorKey: "procedure",
    header: "Procedure",
  },
  {
    accessorKey: "obs",
    header: "Commentaire",
  },

  {
    accessorKey:
      "Utilisateur_ImpObstransclient_UtilisateurIdToUtilisateur.usr_nomprenom",
    header: "Non utilisateur",
  },
  {
    accessorKey: "dateobs",
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
  },

  // {
  //   accessorKey: "VTRF.libelle",
  //   header: "validation",
  // },

  {
    accessorKey: "Mott.libelle",
    header: "Motifs",
  },
];
