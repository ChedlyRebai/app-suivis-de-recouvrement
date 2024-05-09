"use client";
import { ab_client } from "@/Models/ab_client.model";
import { Utilisateur, usersAdmin } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const Utilisateurcolumns: ColumnDef<usersAdmin>[] = [
  {
    accessorKey: "usr_matricule",
    header: "Matricule",
  },

  {
    accessorKey: "usr_nomprenom",
    header: "Non & premon",
  },
  {
    accessorKey: "flgstatut",
    header: "Actif/Inactif",
    cell: ({ row }) => {
      return row.original.flgstatut === "A" ? (
        <>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            Actif
          </span>
        </>
      ) : (
        <>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
            <svg
              className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            Inactif
          </span>
        </>
      );
    },
  },
  {
    accessorKey: "email_chargee",
    header: "email",
  },
  {
    accessorKey: "tel_chargee",
    header: "telephone",
  },
  {
    accessorKey:"Fonction",
    header:"Fonction",
    cell: ({ row }) => {
      console.log(row.original?.AffecterA?.[0]?.Zone?.libelle);
      return (
        <div>
          {row.original?.fonction.lib_fonction}     
        </div>
      );
    },
  },

  {
    accessorKey:"Departement",
    header:"Department",
    cell: ({ row }) => {
      console.log(row.original?.AffecterA?.[0]?.Zone?.libelle);
      return (
        <div>
          {row.original?.fonction.departement.nom_depart}     
        </div>
      );
    },
  },

  {
    accessorKey: "Affectation",
    header: "Affecter A",
    cell: ({ row }) => {
      console.log(row.original?.AffecterA?.[0]?.Zone?.libelle);
      return (
        <div>
          {row.original?.AffecterA?.[0]?.Zone?.libelle}
          
        </div>
      );
    },
  },
];
