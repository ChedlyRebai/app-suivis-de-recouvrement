"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useAuthModal from "@/hooks/use-fonction-search-modal";
import { Button } from "../ui/button";
import { getAllDroitAccess } from "@/actions/droit_accees.action";
import { DataTable } from "./Search-Fonction-DataTable";
import { droit_accees } from "@/Models/droit_accees.model";
import { fontion } from "@/Models/fonction.model";
import { getAllFunctions } from "@/actions/fonction.action";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

function SearchFonctionModal() {
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const columns: ColumnDef<fontion>[] = [
    {
      accessorKey: "code_fonction",
      header: "Code Fonction",
      cell: ({ row }) => {
        return <>{`${row.getValue("code_fonction")}`}</>;
      },
      accessorFn: (originalRow) => {
        return originalRow.code_fonction.toString();
      },
    },
    {
      accessorKey: "lib_fonction",
      header: "Libelle",
    },
  ];

  function getData(): fontion[] {
    // Fetch data from your API here.
    return [
      {
        code_fonction: 1,
        lib_fonction: "eeeee",
      },
      {
        code_fonction: 1,
        lib_fonction: "eeeee",
      },
      {
        code_fonction: 5,
        lib_fonction: "eeeee",
      },
      {
        code_fonction: 8,
        lib_fonction: "eeeee",
      },
    ];
  }

  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllFunctions();
      console.log(response);
      setData(response.data);
    };

    fetchData();
  }, []);
  const d2 = getData();
  return (
    <Modal
      title="Liste des fontions"
      description="Rechercher une fonction"
      isOpen={isOpen}
      onChange={onClose}
    >
      <DataTable columns={columns} data={data} />
    </Modal>
  );
}

export default SearchFonctionModal;
