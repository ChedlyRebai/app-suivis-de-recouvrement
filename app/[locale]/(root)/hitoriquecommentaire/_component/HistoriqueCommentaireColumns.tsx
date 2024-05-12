"use client";
import { ColumnDef } from "@tanstack/react-table";
export const HistoriqueCommentaireColumns: ColumnDef<any>[] = [
  {
    accessorKey: "numobs",
    header: "N°",
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
    header: "Date Saisie",
  },
  {
    accessorKey: "VTRF.libelle",
    header: "validation",
  },
  {
    accessorKey: "Mott.libelle",
    header: "Motifs",
  },
];
