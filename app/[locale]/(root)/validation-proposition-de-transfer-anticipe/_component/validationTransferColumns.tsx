"use client";
import { ab_client } from "@/Models/ab_client.model";
import { MOTT, VTRF, getMotif } from "@/actions/motif.action";
import { getTypeTransfer, updateTransferAnti } from "@/actions/transfer.action";
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
import { ArrowUpDown, SearchIcon } from "lucide-react";

export const validationTransferColumns: ColumnDef<any>[] = [
  {
    accessorKey: "cli",
    header: "cli",
  },
  {
    accessorKey: "nom",
    header: "Non",
  },

  {
    accessorKey: "age",
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
    accessorKey: "age",
    header: "Zone",
    cell: ({ row }) => {
      return (
        <span>
          {row.original?.Zone.codug} {row.original?.Zone.libelle}
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
    accessorKey: "Trans.libelle",
    header: "Transferer à",
    // cell: async ({ row }) => {
    //   const typeTransfer = await getTypeTransfer();
    //   return (
    //     <Select defaultValue={row.getValue("TRAF_A")}>
    //       <SelectTrigger className={` w-fit `}>
    //         <SelectValue className="" placeholder="Select a fruit" />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectGroup id="TRAF_A">
    //           {" "}
    //           {typeTransfer.map((item: any) => (
    //             <SelectItem key={item.codenv} value={`${item.codenv}`}>
    //               {item.libelle}
    //             </SelectItem>
    //           ))}
    //         </SelectGroup>
    //       </SelectContent>
    //     </Select>
    //   );
    // },
  },

  {
    accessorKey: "Mott.codenv",
    header: "Motif de transfer",
    cell: async ({ row }) => {
      const motif = await MOTT();
      console.log(motif);
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
          defaultValue={row.original?.mott}
        >
          <SelectTrigger
          // className={` w-fit ${
          //   row.getValue("Mott.codenv") == "O"
          //     ? "border-green-500"
          //     : "border-red-500"
          // }`}
          >
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="MOTT">
              {" "}
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
  },

  {
    accessorKey: "trf_propose_v",
    header: "validations",
    cell: async ({ row }) => {
      const vtrf = await VTRF();
      return (
        <Select
          defaultValue={row.getValue("trf_propose_v")}
          onValueChange={(newValue) => {
            console.log(newValue, row.original?.cli);
            updateTransferAnti(row.original?.cli, "trf_propose_v", newValue);
          }}
        >
          <SelectTrigger
            className={` w-fit ${
              row.getValue("trf_propose_v") == "O"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="TRAF_A">
              {" "}
              {vtrf.map((item: any) => (
                <SelectItem key={item.codenv} value={item.codenv}>
                  {item.libelle}
                </SelectItem>
              ))}
              {/* <SelectItem value="O">Validé</SelectItem>
              <SelectItem value="N">Non Validé</SelectItem> */}
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
      return (
        <div className="flex justify-center">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              // setModalData(row.original);
              // setModalOpen(true);
            }}
          >
            Detaille
            <SearchIcon size={16} />
          </Button>
        </div>
      );
    },
  },

  // TRF_PROPOSE_V
];
