"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useAuthModal from "@/hooks/use-fonction-search-modal";
import { Button } from "../../ui/button";
import { getAllDroitAccess } from "@/actions/droit_accees.action";
import { DataTable } from "../Search-Fonction-DataTable";
import { droit_accees } from "@/Models/droit_accees.model";
import { fonction } from "@/Models/fonction.model";
import { getAllFunctions } from "@/actions/fonction.action";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../ui/checkbox";
import { useTranslations } from "next-intl";
import { ArrowUpDown } from "lucide-react";

function SearchFonctionModal() {
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const lang = useTranslations();
  const columns: ColumnDef<fonction>[] = [
    {
      accessorKey: "code_fonction",
      header: ({ column }) => {
        return (
          <Button
            className="px-1 flex "
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {lang("funcModal.codef")}
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <>{`${row.getValue("code_fonction")}`}</>;
      },
      accessorFn: (originalRow) => {
        return originalRow.code_fonction.toString();
      },
    },
    {
      accessorKey: "lib_fonction",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-fit px-"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {lang("funcModal.lib")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllFunctions();
      console.log(data);
      setData(data || []);
    };
    fetchData();
  }, []);

  return (
    <Modal
      title={lang("funcModal.title")}
      description={lang("funcModal.desc")}
      isOpen={isOpen}
      onChange={onClose}
    >
      <DataTable columns={columns} data={data} />
    </Modal>
  );
}

export default SearchFonctionModal;
