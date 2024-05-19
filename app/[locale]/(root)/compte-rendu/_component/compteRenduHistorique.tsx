"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  SearchIcon,
  Trash2,
  ZoomInIcon,
  ZoomOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import useCompteRenduModal from "@/hooks/use-compte-rendu-modal";
import CompteRenduModal from "@/components/shared/Modals/Compte-Rendu-Modal";
import { useQuery } from "@tanstack/react-query";
import { getListCompteRenduHistorique } from "@/actions/client.action";
import { useSearchParams } from "next/navigation";
import { CompteRenduList } from "@/constants/types";
import { deleteFile } from "@/actions/file.action";
import { deleteCompteRenduById } from "@/actions/comptrendu.action";

interface CompteRenduHistoriqueProps {
  listHistorique: CompteRenduList[];
}

const CompteRenduHistorique = ({
  listHistorique: daa,
}: CompteRenduHistoriqueProps) => {
  const { onOpen } = useCompteRenduModal();
  const {
    isRefetching,
    data: dataCompte = [],
    isLoading,
    refetch,
  } = useQuery<CompteRenduList[]>({
    queryKey: ["getCompteRenduHistorique"],
    queryFn: async () => await getListCompteRenduHistorique(cli as string),
    refetchOnMount: true,
  });
  const searchParams = useSearchParams();
  const cli = searchParams.get("cli");

  if (!dataCompte) return <div>Pas de résultat</div>;

  console.log(dataCompte);
  const columns: ColumnDef<CompteRenduList>[] = [
    {
      accessorKey: "num",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getSortIndex() === 0)}
          >
            Num
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    // {
    //   accessorKey: "id",
    //   // header: ({ column }) => {
    //   //   return (
    //   //     <div className="hidden"/>
    //   //   );
    //   // },
    //   cell: ({ row }) => <div className="hidden">{row.getValue("id")}</div>,
    // },

    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Compte Rendu
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {new Date(row.getValue("created_at")).toLocaleDateString()}
        </div>
      ),
    },

    {
      accessorKey: "compte_rendu",
      header: ({ column }) => {
        // console.log(data[14].compterendutype_compterendutype_compterenduidTosuivi_agenda[0].types)
        return <span>Compte Rendu</span>;
      },

      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("compte_rendu")}</div>
      ),
    },

    {
      accessorKey: "usr_nom",
      header: ({ column }) => {
        return <span>Utilisateur</span>;
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("usr_nom")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: ({ column }) => {
        return <div>Action</div>;
      },
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <div className="flex justify-center">
            <Button
              className="flex items-center h-full  justify-center"
              variant="default"
              onClick={() => onOpen(row.original.id)}
            >
              <SearchIcon className="mr-" />
            </Button>

            <Button
              variant="destructive"
              onClick={async () => {
                await deleteCompteRenduById(row.original.id);
                refetch();
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log(dataCompte);
  if (!dataCompte) return <div>Pas de résultat</div>;
  const table = useReactTable({
    data: dataCompte,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  if (isLoading) {
    return <div>Chargement......</div>;
  }

  if (isRefetching) {
    refetch();
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("num")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("num")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="py-2 pl-2"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Pas de résultats.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CompteRenduModal />
    </div>
  );
};

export default CompteRenduHistorique;
