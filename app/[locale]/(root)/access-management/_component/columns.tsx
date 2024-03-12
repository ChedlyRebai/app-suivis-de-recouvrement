"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { droit_accees } from "@/Models/droit_accees.model";
import useEditDroit from "@/hooks/use-edit-droit-modal";
import useStore from "@/hooks/useLangStore";
import useLangStore from "@/hooks/useLangStore";
import { useTranslations } from "next-intl";

export const columns: ColumnDef<droit_accees>[] = [
  {
    accessorKey: "nom",
    header: ({ column }) => {
      console.log("column lang");
      //const lang = useLangStore((state) => state.lang.Nom);
      //console.log(lang);
      const lang = useTranslations();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {lang("access-management.Nom")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nom_module",
    header: ({ column }) => {
      const lang = useTranslations();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {lang("access-management.ModuleP")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "code_fonction",
    header: ({ column }) => {
      const lang = useTranslations();
      return <span>{lang("access-management.Codef")}</span>;
    },
    cell: ({ row }) => {
      return (
        <span
          className={`inline-flex bg-gray-100 text-gray-800 items-center px-2.5 py-0.5 rounded-md text-lg font-medium `}
        >
          {row.getValue("code_fonction")}
        </span>
      );
    },
  },
  {
    accessorKey: "acces",
    header: ({ column }) => {
      const lang = useTranslations();
      return <span>{lang("access-management.Acces")}</span>;
    },
    cell: ({ row }) => {
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-lg font-medium ${
            row.getValue("acces") === "O"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } `}
        >
          {row.getValue("acces") === "O" ? "Oui" : "Non"}
        </span>
      );
    },
  },
  {
    accessorKey: "creation",
    header: ({ column }) => {
      const lang = useTranslations();
      return <span>{lang("access-management.Creat")}</span>;
    },
    cell: ({ row }) => {
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-lg font-medium ${
            row.getValue("creation") === "O"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } `}
        >
          {row.getValue("creation") === "O" ? "Oui" : "Non"}
        </span>
      );
    },
  },
  {
    accessorKey: "modification",
    header: ({ column }) => {
      const lang = useTranslations();
      return <span>{lang("access-management.Modif")}</span>;
    },
    cell: ({ row }) => {
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-lg font-medium ${
            row.getValue("modification") === "O"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } `}
        >
          {row.getValue("modification") === "O" ? "Oui" : "Non"}
        </span>
      );
    },
  },
  {
    accessorKey: "suppression",
    header: ({ column }) => {
      const lang = useTranslations();
      return <span>{lang("access-management.Supp")}</span>;
    },
    cell: ({ row }) => {
      return (
        <span
          className={`inline-flex justify-center items-center px-2.5 py-0.5 rounded-md text-lg  font-medium ${
            row.getValue("suppression") === "O"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } `}
        >
          {row.getValue("suppression") === "O" ? "Oui" : "Non"}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "email",
  // header: ({ column }) => {
  //   return (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Email
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   );
  // },
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const {
        onOpen,
        setId,
        setAccess,
        setCreation,
        setModification,
        setSuppresion,
        acces,
      } = useEditDroit();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                onOpen();
                console.log(`${row.original.id}`);
                setId(`${row.original.id}`);

                setAccess(`${row.original.acces}`);

                setCreation(`${row.original.creation}`);
                setSuppresion(`${row.original.suppression}`);
                setModification(`${row.original.modification}`);
              }}
            >
              Edit
            </DropdownMenuItem>

            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
