"use client";
import { ab_client } from "@/Models/ab_client.model";
import { File } from "@/Models/file.model";
import { Utilisateur, usersAdmin } from "@/actions/admin.action";
import { deleteFile } from "@/actions/file.action";
import AlertConfirmation from "@/components/shared/confirmationAlert";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Download, EyeIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const filecolumns: ColumnDef<File>[] = [
  // {
  //   accessorKey: "nom client",
  //   header: "Nom client",
  //   cell: ({ row }) => {
  //     return row.original.ab_client.nom;
  //   },
  // },
  {
    accessorKey: "File Name",
    header: "Nom de fichier",
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
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <Button
            className="mr-1"
            variant="default"
            onClick={() => {
              window.open(row.original.FilePath);
            }}
          >
            <EyeIcon size={16} />
          </Button>{" "}
          <AlertConfirmation
            variant="destructive"
            icon={<Trash2 size={20} />}
            buttonText={""}
            description=" Voulez-vous vraiment supprimer cette fichier"
            title="Suppression de fichier"
            onConfirm={async () => {
              await deleteFile(row.original.id)
                .then(() => {
                  //in french
                  toast.success("Fichier supprimé avec succès");
                })
                .catch(() => {
                  toast.error("Erreur lors de la suppression");
                });
            }}
          />
          {/* <Button variant="destructive" onClick={async () => {}}>
            <Trash2 size={16} />
          </Button> */}
        </div>
      );
    },
  },
];
