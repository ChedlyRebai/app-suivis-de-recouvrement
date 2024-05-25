"use client";
import { ab_client } from "@/Models/ab_client.model";
import { getMotifCommercial } from "@/actions/motif.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, HistoryIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const demandeProlongationColumns: ColumnDef<ab_client>[] = [
  {
    accessorKey: "cli",
    header: "cli",
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
    accessorKey: "classe",
    header: "Classe",
  },

  {
    accessorKey: "mott_prol_c",
    header: "Motif de Prolongation",
    cell: async ({ row }) => {
      const motifCommercial = await getMotifCommercial();
      return (
        // <span
        //   className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-lg font-medium ${
        //     row.getValue("acces") === "O"
        //       ? "bg-green-100 text-green-800"
        //       : "bg-red-100 text-red-800"
        //   } `}
        // >
        //   {row.getValue("acces") === "O" ? "Oui" : "Non"}
        // </span>
        <Select
          // onValueChange={(newValue) =>
          //   update(
          //     row.getValue("code_fonction"),
          //     row.getValue("id"),
          //     newValue,
          //     "acces"
          //   )
          // }
          defaultValue={row.getValue("mott_prol_c") || ""}
        >
          <SelectTrigger
            className={` w-fit ${
              row.getValue("acces") == "O"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="mott_prol_c">
              {" "}
              <SelectItem value="O">Oui</SelectItem>
              <SelectItem value="N">Non</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "obs1",
    header: "Commentaire",
  },
  {
    accessorKey: "prol_c",
    header: "prol_c",
    cell: ({ row }) => {
      return (
        <Select defaultValue={row.getValue("prol_c")}>
          <SelectTrigger
            className={` w-fit ${
              row.getValue("acces") == "O"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="prol_c">
              {" "}
              <SelectItem value="O">Oui</SelectItem>
              <SelectItem value="N">Non</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },

  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div className="flex ">
          <Button
            className="h-10 w-h-10 mr-1 hover:bg-blue-800 bg-blue-700 text-white"
            variant="default"
            size="sm"
            onClick={() => {
              // Navigate to the new page with the cli as a query parameter
              router.push(`hitoriquecommentaire?cli=${row.original?.cli}`);
            }}
          >
            <HistoryIcon size={16} />
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => {
              // setModalData(row.original);
              // setModalOpen(true);
            }}
          >
            Détails
            <SearchIcon size={16} />
          </Button>
        </div>
      );
    },
  },
];
