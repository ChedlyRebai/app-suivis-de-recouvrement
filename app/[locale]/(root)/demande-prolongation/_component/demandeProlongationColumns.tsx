"use client";
import { ab_client } from "@/Models/ab_client.model";
import { getMotifCommercial } from "@/actions/motif.action";
import {
  updateTransferAnti,
  updatedemandeprolongation,
} from "@/actions/transfer.action";
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
import useDemandeProlongationModal from "@/hooks/use-demande-prolongation-Modal";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const demandedeprolongation: ColumnDef<any>[] = [
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
    accessorKey: "motif_prol_c",
    header: "Motif de prolongation",
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
          defaultValue={row.getValue("motif_prol_c") || ""}
          onValueChange={(newValue) => {
            console.log(newValue, row.original?.cli);
            updatedemandeprolongation(
              row.original?.cli,
              "motif_prol_c",
              newValue
            );
          }}
        >
          <SelectTrigger
            className={` w-fit ${
              row.getValue("motif_prol_c") == "O"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="motif_prol_c">
              {" "}
              {motifCommercial.map((item) => (
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

    //     <Select

    //       defaultValue={row.getValue("OBS1")}
    //     >
    //       <SelectTrigger className={` w-fit ${row.getValue("acces")=='O'?'border-green-500' :'border-red-500'}`}>
    //         <SelectValue className="" placeholder="Select a fruit" />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectGroup id="OBS1">
    //           {" "}
    //           <SelectItem  value="O">
    //             Oui
    //           </SelectItem>
    //           <SelectItem  value="N">
    //             Non
    //           </SelectItem>
    //         </SelectGroup>
    //       </SelectContent>
    //     </Select>
    //   );
    // },
  },
  // {
  //   accessorKey:"MOTT",
  //   header:"Motif de transfer",
  //   cell: ({ row }) => {
  //     return (

  //       <Select

  //         defaultValue={row.getValue("MOTT")}
  //       >
  //         <SelectTrigger className={` w-fit ${row.getValue("acces")=='O'?'border-green-500' :'border-red-500'}`}>
  //           <SelectValue className="" placeholder="Select a fruit" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectGroup id="acces">
  //             {" "}
  //             <SelectItem  value="O">
  //               Oui
  //             </SelectItem>
  //             <SelectItem  value="N">
  //               Non
  //             </SelectItem>
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //     );
  //   },
  // },
  // {
  //   accessorKey:"TRAF_A",
  //   header:"Transferer à",
  //   cell: ({ row }) => {
  //     return (

  //       <Select

  //         defaultValue={row.getValue("TRAF_A")}
  //       >
  //         <SelectTrigger className={` w-fit ${row.getValue("acces")=='O'?'border-green-500' :'border-red-500'}`}>
  //           <SelectValue className="" placeholder="Select a fruit" />
  //         </SelectTrigger>
  //         <SelectContent>
  //           <SelectGroup id="TRAF_A">
  //             {" "}
  //             <SelectItem  value="O">
  //               Oui
  //             </SelectItem>
  //             <SelectItem  value="N">
  //               Non
  //             </SelectItem>
  //           </SelectGroup>
  //         </SelectContent>
  //       </Select>
  //     );
  //   },
  // },
  // PROL_PROPOSE_C
  {
    accessorKey: "prol_propose_c",
    header: "checkbox",
    cell: ({ row }) => {
      return (
        <Checkbox
          onCheckedChange={(value: any) => {
            console.log(value, row.original?.cli);
            updatedemandeprolongation(
              row.original?.cli,
              "prol_propose_c",
              value
            );
          }}
          onClick={(newValue: any) => {
            console.log(newValue.target.checked, row.original?.cli);
            // updatedemandeprolongation(
            //   row.original?.cli,
            //   "prol_propose_c",
            //   newValue
            // );
          }}
          id="terms"
          defaultChecked={row.getValue("prol_propose_c") == "O" ? true : false}
        />
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { onOpen, setId } = useDemandeProlongationModal();
      return (
        <Button
          variant="ghost"
          onClick={() => {
            setId(row.original?.id);
            onOpen();
          }}
        >
          Action
        </Button>
      );
    },
  },
];
