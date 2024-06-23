"use client";
import { ab_client } from "@/Models/ab_client.model";
import { updateEtatLetttre } from "@/actions/lettre.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Send, UploadIcon } from "lucide-react";

import toast from "react-hot-toast";
import AlertConfirmation from "../../../../../../components/shared/confirmationAlert";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     // Access the cli value
  //     const cli = row.original.cli;

  //     // Render the checkbox based on the cli value
  //     if (cli) {
  //       return (
  //         <Checkbox
  //           checked={row.getIsSelected()}
  //           onCheckedChange={(value) => {
  //             row.toggleSelected(!!value);

  //             console.log(row.getIsSelected());
  //           }}
  //           aria-label="Select row"
  //         />
  //       );
  //     }

  //     // Render nothing if cli is not truthy
  //     return null;
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: "ab_client.nom",
    header: "Non",
  },

  {
    accessorKey: "ncp",
    header: "N°compte",
  },
  {
    accessorKey: "age",
    header: "Agence",
    cell: ({ row }) => {
      return (
        <>
          {row.original.Agence?.codug} : {row.original.Agence?.libelle}
        </>
      );
    },
  },
  {
    accessorKey: "nbre_imp",
    header: "Nb.impayée",
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
    accessorKey: "mnt_sdb",
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
    accessorKey: "tot_eng",
    header: "Engagement",
  },

  {
    header: "Télécharger un fichier",
    cell: ({ row, column, table }) => {
      return (
        <>
          <Button variant="outline" size="sm">
            <Link
              href={`/fr/file?cli=${row.original.cli}&id=${row.original?.ab_client?.id}`}
            >
              <UploadIcon size={16} />
            </Link>{" "}
          </Button>
        </>
      );
    },
  },
  {
    accessorKey: "etat_lettre",
    header: "Envoyer lettre",
    cell: ({ row, column, table }) => {
      // const canDelete = (table?.options?.meta?.access as any) || {};

      const canView = table?.options?.meta as any;
      console.log(canView);
      return (
        <AlertConfirmation
          disabled={canView.access.creation === "N"}
          buttonText="Envoyer"
          title="Envoyer la lettre de recouvrement"
          description="Voulez-vous vraiment envoyer la lettre de recouvrement ?"
          onConfirm={async () => {
            await updateEtatLetttre(row.original.ncp, "O")
              .then((res) => {
                console.log(res);
                toast.success("État de la lettre mis à jour");
              })
              .catch((error) => {
                toast.error(
                  "Erreur lors de la mise à jour de l'état de la lettre"
                );
              });
            console.log(row.original.etat_lettre);
          }}
        />
      );
    },
  },
];
