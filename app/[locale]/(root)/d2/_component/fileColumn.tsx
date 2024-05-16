"use client";
import { ab_client } from "@/Models/ab_client.model";
import { File } from "@/Models/file.model";
import { Utilisateur, usersAdmin } from "@/actions/admin.action";
import { deleteFile } from "@/actions/file.action";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Download, Trash2 } from "lucide-react";

export const filecolumns: ColumnDef<File>[] = [
  {
    accessorKey: "cli client",
    header: "cli client",
    cell: ({ row }) => {
      return row.original.ab_client.cli;
    },
  },

  {
    accessorKey: "nom client",
    header: "nom client",
    cell: ({ row }) => {
      return row.original.ab_client.nom;
    },
  },
  {
    accessorKey: "File Name",
    header: "File Name",
    cell: ({ row }) => {
      return row.original.FileName;
    },
  },

  //   {
  //     accessorKey: "FilePath",
  //     header: "FilePath",
  //   },

  {
    accessorKey: "created_at",
    header: "Ajouter on",
    cell: ({ row }) => {
      return row.original.created_at.toString().substring(0, 10);
    },
  },

  {
    accessorKey: "Utilisateur.usr_matricule",
    header: "Utilisateur matricule",
  },
  {
    accessorKey: "Utilisateur.usr_nomprenom",
    header: "Utilisateur nom",
  },

  {
    accessorKey: "",
    header: "download File",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            variant="default"
            onClick={() => {
              window.open(row.original.FilePath);
            }}
          >
            <Download size={16} />
          </Button>{" "}
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteFile(row.original.id);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      );
    },
  },
];
