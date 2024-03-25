"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "../../ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { useTranslations } from "next-intl";
import { ArrowUpDown } from "lucide-react";
import useListeAgencestModal from "@/hooks/useListeAgences";
import { getAgences } from "@/actions/client.action";
import { ListeAgenceDataTable } from "./liste-agences-datatable";

const ListeAgenceModal = () => {
  const { isOpen, onOpen, onClose,column } = useListeAgencestModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const lang = useTranslations();
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "codug",
      header: ({ column }) => {
        return (
          <Button
            className="px-1 flex "
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Codug
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span onClick={e=>console.log(e)}>{`${row.getValue("codug")}`}</span>;
      },
      accessorFn: (originalRow) => {
        return originalRow.codug.toString();
      },
    },
    {
      accessorKey: "libelle",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-fit px-"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Libelle
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAgences();
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);
  console.log(column)
  return (
    <Modal
      title="Liste des agences"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
     <ListeAgenceDataTable column={column} columns={columns} data={data} />
    </Modal>
  );
};

export default ListeAgenceModal;
