// {
//     FileName: 'Facture_TN480353.pdf',
//     FilePath: 'https://adnugdihznkdjipy.public.blob.vercel-storage.com/kDsBbBg-W9pArcuP7Z3qvPDBmBtC1r31RvdeR9.form-data;%20boundary=----WebKitFormBoundary1bAZPQZ0bgdZ4SsK',
//     created_at: '2024-05-09T19:16:37.877Z',
//     Utilisateur: {
//       usr_nomprenom: 'DIRECTEUR ',
//       usr_matricule: '1802',
//       AffecterA: []
//     }
//   }

"use client";
import { ab_client } from "@/Models/ab_client.model";
import { File } from "@/Models/file.model";
import { Utilisateur, usersAdmin } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const filecolumns: ColumnDef<File>[] = [
    {
        accessorKey: "nom client",
        header: "b_client",
        cell: ({ row }) => {
          return row.original.ab_client.nom;
        },
      },
    {
    accessorKey: "FileName",
    header: "FileName",
  },

//   {
//     accessorKey: "FilePath",
//     header: "FilePath",
//   },
  {
    accessorKey: "created_at",
    header: "created_at",
  },

  {
    accessorKey: "Utilisateur",
    header: "Utilisateur",
    cell: ({ row }) => {
      return row.original.Utilisateur.usr_matricule;
    },
  },
  {
    accessorKey: "Utilisateur",
    header: "Utilisateur",
    cell: ({ row }) => {
      return row.original.Utilisateur.usr_nomprenom;
    },
  },
  {
    accessorKey: "nom client",
    header: "b_client",
    cell: ({ row }) => {
      return row.original.ab_client.nom;
    },
  },
  {
    accessorKey: "Matricule client",
    header: "b_client",
    cell: ({ row }) => {
      return row.original.ab_client.cli;
    },
  },
];
