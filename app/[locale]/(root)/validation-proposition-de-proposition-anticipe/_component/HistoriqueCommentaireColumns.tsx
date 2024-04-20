
"use client";
import { ColumnDef } from "@tanstack/react-table";
export const HistoriqueCommentaireColumns: ColumnDef<any>[] = [
  
  {
    accessorKey: "NUMOBS",
    header: "N°",
  },
  {
    accessorKey: "OBS",
    header: "Commentaire",
  },

  {
    accessorKey: "matricule",
    header: "Non utilisateur",
  },
  {
    accessorKey: "DATEOBS",
    header: "Date Saisie",
  },
  {
    accessorKey: "Motif",
    header: "Motif",
  },
];
