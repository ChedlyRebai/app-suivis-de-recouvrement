"use client";
import { ab_client } from "@/Models/ab_client.model";
import { ab_cxrepenv } from "@/Models/ab_cxrepenv.model";
import { getMotif } from "@/actions/motif.action";
import { getTypeTransfer } from "@/actions/transfer.action";
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
import { libelleMotif } from "@/constants";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const demandeTransferColumns: ColumnDef<ab_client>[] = [
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
    accessorKey: "MOTT",
    header: "Motif de transfer",
    cell: ({ row }) => {
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
          defaultValue={row.getValue("MOTT")}
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
            <SelectGroup id="MOTT">
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
    accessorKey: "OBS1",
    header: "Commentaire",
    cell: ({ row }) => {
      return (
        <Select defaultValue={row.getValue("OBS1")}>
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
            <SelectGroup id="OBS1">
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
    accessorKey: "MOTT",
    header: "Motif de transfer",
    cell: async ({ row }) => {
      const motifs = await getMotif();
      return (
        <Select defaultValue={row.getValue("MOTT")}>
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
            <SelectGroup id="acces">
              {motifs.map((item: any) => (
                <SelectItem key={item.codenv} value={`${item.codenv}`}>
                  {item.libelle}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "TRAF_A",
    header: "Transferer à",
    cell: async ({ row }) => {
      const typeTransfer = await getTypeTransfer();
      return (
        <Select defaultValue={row.getValue("TRAF_A")}>
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
            <SelectGroup id="TRAF_A">
              {" "}
              {typeTransfer.map((item: any) => (
                <SelectItem key={item.codenv} value={`${item.codenv}`}>
                  {item.libelle}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
];
