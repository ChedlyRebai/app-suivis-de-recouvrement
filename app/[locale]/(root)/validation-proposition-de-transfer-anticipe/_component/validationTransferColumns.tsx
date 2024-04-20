"use client";
import { ab_client } from "@/Models/ab_client.model";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SearchIcon } from "lucide-react";

export const validationTransferColumns: ColumnDef<ab_client>[] = [
  
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
    accessorKey:"traf_a",
    header:"Transferer à",
    cell: ({ row }) => {
      return (
      
        <Select

          defaultValue={row.getValue("traf_a")}
        >
          <SelectTrigger className={` w-fit ${row.getValue("acces")=='O'?'border-green-500' :'border-red-500'}`}>
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="traf_a">
              {" "}
              <SelectItem  value="O">
                Oui
              </SelectItem>
              <SelectItem  value="N">
                Non
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  
  {
    accessorKey:"mott",
    header:"Motif de transfer",
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
          defaultValue={row.getValue("mott")}
        >
          <SelectTrigger className={` w-fit ${row.getValue("acces")=='O'?'border-green-500' :'border-red-500'}`}>
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="MOTT">
              {" "}
              <SelectItem  value="O">
                Oui
              </SelectItem>
              <SelectItem  value="N">
                Non
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey:"OBS1",
    header:"Commentaire",
    
  },
  
  {
    accessorKey:"TRF_PROPOSE_V",
    header:"TRF_PROPOSE_V",
    cell: ({ row }) => {
      return (
      
        <Select

          defaultValue={row.getValue("TRAF_A")}
        >
          <SelectTrigger className={` w-fit ${row.getValue("acces")=='O'?'border-green-500' :'border-red-500'}`}>
            <SelectValue className="" placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup id="TRAF_A">
              {" "}
              <SelectItem  value="O">
                Oui
              </SelectItem>
              <SelectItem  value="N">
                Non
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey:"Action",
    header:"Action",
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
  }

  // TRF_PROPOSE_V

];
