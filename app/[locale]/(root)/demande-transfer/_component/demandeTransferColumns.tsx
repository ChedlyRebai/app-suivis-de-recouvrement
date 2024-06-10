"use client";

import { Button } from "@/components/ui/button";

import { useDemandeTransfernModal } from "@/hooks/use-demande-transfer-Modal";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, HistoryIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

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

  // {
  //   accessorKey: "mott",
  //   header: "Motif de transfer",
  //   cell: async ({ row }) => {
  //     const motif: any = [];
  //     return (
  //       <Select
  //         onValueChange={(newValue) => {
  //           console.log(newValue, row.original?.cli);
  //           updateTransferAnti(row.original?.cli, "mott", newValue);
  //         }}
  //         defaultValue={row.getValue("mott") || ""}
  //       >
  //         <SelectTrigger className={` w-fit`}>
  //           <SelectValue className="" placeholder="Select a fruit" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectGroup id="mott">
  //             {motif.map((item: any) => (
  //               <SelectItem key={item.codenv} value={item.codenv}>
  //                 {item.libelle}
  //               </SelectItem>
  //             ))}
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "obs",
  //   header: "Commentaire",
  // },

  // {
  //   accessorKey: "trf_a",
  //   header: "Transferer à",
  //   cell: async ({ row }) => {
  //     const typeTransfer = await getTypeTransfer();
  //     return (
  //       <Select
  //         defaultValue={row.getValue("trf_a") || ""}
  //         onValueChange={(newValue) => {
  //           console.log(newValue, row.original?.cli);
  //           updateTransferAnti(row.original?.cli, "trf_a", newValue);
  //         }}
  //       >
  //         <SelectTrigger className={` w-fit `}>
  //           <SelectValue className="" placeholder="Select a fruit" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectGroup id="trf_a">
  //             {" "}
  //             {typeTransfer.map((item: any) => (
  //               <SelectItem key={item.codenv} value={item.codenv}>
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
    accessorKey: "action",
    header: "Action",
    cell: ({ row, column, table }) => {
      // const canDelete = (table?.options?.meta?.access as any) || {};

      const canView = table?.options?.meta as any;
      console.log(canView);
      const { onOpen, setId } = useDemandeTransfernModal();

      return (
        <div className="flex ">
          <Button
            disabled={canView?.histoariqueAccess.acces === "N"}
            className="h-10 w-h-10 mr-1 hover:bg-blue-800 bg-blue-700 text-white"
            variant="default"
            size="sm"
          >
            <Link href={`hitoriquecommentaire?cli=${row.original?.cli}`}>
              <HistoryIcon size={16} />
            </Link>
          </Button>
          <Button
            disabled={canView?.access.creation === "N"}
            className="h-10 w-h-10"
            onClick={() => {
              setId(row.original?.id);
              onOpen();
            }}
          >
            Demande
          </Button>
        </div>
      );
    },
  },
];
