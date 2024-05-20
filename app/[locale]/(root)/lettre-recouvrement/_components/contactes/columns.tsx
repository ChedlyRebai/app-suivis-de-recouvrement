"use client";
import { ab_client } from "@/Models/ab_client.model";
import { updateEtatLetttre } from "@/actions/lettre.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Send } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import AlertConfirmation from "./confirmationAlert";

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
    accessorKey: "nom",
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
    accessorKey: "etat_lettre",
    header: ({ column }) => (
      <Checkbox
        onCheckedChange={(value) => {
          console.log(value);
        }}
      />
    ),
    cell: ({ row }) => {
      return (
        // <Checkbox
        //   defaultChecked={row.original.etat_lettre === "O"}
        //   onCheckedChange={async (value) => {
        //     await updateEtatLetttre(
        //       row.original.ncp,
        //       row.original.etat_lettre === "N" ? "O" : "N"
        //     );
        //     console.log(row.original.etat_lettre);
        //   }}
        // />

        // <AlertConfirmation
        //   // icon={<Send size={13} />}
        //   buttonText="Envoyer"
        //   title="Êtes-vous absolument sûr ?"
        //   description="Cette action est irréversible. Cela supprimera définitivement votre compte et supprimera vos données de nos serveurs."
        //   onConfirm={async () => {
        //     await updateEtatLetttre(row.original.ncp, "O")
        //       .then((res) => {
        //         console.log(res);
        //         toast.success("État de la lettre mis à jour");
        //       })
        //       .catch((error) => {
        //         toast.error(
        //           "Erreur lors de la mise à jour de l'état de la lettre"
        //         );
        //       });
        //     console.log(row.original.etat_lettre);
        //   }}
        // />

        <></>
      );
    },
  },
];
