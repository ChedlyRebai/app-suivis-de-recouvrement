"use client";

import { ab_client } from "@/Models/ab_client.model";
import { MOTT, getMotif } from "@/actions/motif.action";
import { getTypeTransfer, updateTransferAnti } from "@/actions/transfer.action";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const demandeTransferColumns: ColumnDef<any>[] = [
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

  // {
  //   accessorKey: "ncp",
  //   header: "N°compte",
  // },
  {
    accessorKey: "agence",
    header: "Agence",
    cell: ({ row }) => {
      return (
        <span>
          {row.original?.Agence.codug} {row.original?.Agence.libelle}
        </span>
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
    accessorKey: "sd",
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
    accessorKey: "engagement",
    header: "Engagement",
  },
  {
    accessorKey: "classe",
    header: "Classe",
  },

  {
    accessorKey: "mott",
    header: "Motif de transfer",
    cell: async ({ row }) => {
      const motif = await MOTT();
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
          onValueChange={(newValue) => {
            console.log(newValue, row.original?.cli);
            updateTransferAnti(row.original?.cli, "mott", newValue);
          }}
          defaultValue={row.getValue("mott") || ""}
        >
          {/* <Select
          defaultValue={row.getValue("trf_propose_v")}
          onValueChange={(newValue) => {
            console.log(newValue, row.original?.cli);
            updateTransferAnti(row.original?.cli, "trf_propose_v", newValue);
          }}
        > */}
          <SelectTrigger className={` w-fit`}>
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="mott">
              {motif.map((item: any) => (
                <SelectItem key={item.codenv} value={item.codenv}>
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
    accessorKey: "obs",
    header: "Commentaire",
    // cell: ({ row }) => {
    //   return (
    //     <Select defaultValue={row.getValue("OBS1")}>
    //       <SelectTrigger
    //         className={` w-fit`}
    //       >
    //         <SelectValue className="" placeholder="Select a fruit" />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectGroup id="OBS1">
    //           {" "}
    //           <SelectItem value="O">Oui</SelectItem>
    //           <SelectItem value="N">Non</SelectItem>
    //         </SelectGroup>
    //       </SelectContent>
    //     </Select>
    //   );
    // },
  },

  // {
  //   accessorKey: "MOTT",
  //   header: "Motif de transfer",
  //   cell: async ({ row }) => {
  //     const motifs = await getMotif();
  //     return (
  //       <Select defaultValue={row.getValue("MOTT")}>
  //         <SelectTrigger
  //           className={` w-fit`}
  //         >
  //           <SelectValue className="" placeholder="Select a fruit" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectGroup id="MOTT">
  //             {motifs.map((item: any) => (
  //               <SelectItem key={item.codenv} value={`${item.codenv}`}>
  //                 {item.libelle}
  //               </SelectItem>
  //             ))}
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //     );
  //   },
  // },

  {
    accessorKey: "trf_a",
    header: "Transferer à",
    cell: async ({ row }) => {
      const typeTransfer = await getTypeTransfer();
      return (
        <Select
          defaultValue={row.getValue("trf_a") || ""}
          onValueChange={(newValue) => {
            console.log(newValue, row.original?.cli);
            updateTransferAnti(row.original?.cli, "trf_a", newValue);
          }}
        >
          <SelectTrigger className={` w-fit `}>
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="trf_a">
              {" "}
              {typeTransfer.map((item: any) => (
                <SelectItem key={item.codenv} value={item.codenv}>
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
