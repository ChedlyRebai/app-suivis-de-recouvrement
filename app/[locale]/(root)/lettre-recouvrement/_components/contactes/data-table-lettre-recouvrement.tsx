"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Check, ChevronsUpDown, RefreshCcwIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/shared/Data-Table-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { ab_client } from "@/Models/ab_client.model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useListAgences from "@/hooks/use-agences-list";
import { Card, CardContent } from "@/components/ui/card";
import { DataTableViewOptions } from "@/components/shared/data-table-view-options";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Access } from "@/actions/acess.action";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  total: any;
  data: TData[];
  totalAccout?: number;
  totalPages?: number;
  groupes: any[];
  agences: any[];
  access: Access;
}

export function DataTableLettreDeRecouvrement<TData, TValue>({
  columns,
  data,
  totalAccout,
  totalPages = 0,
  total,
  agences,
  groupes,
  access,
}: DataTableProps<TData, TValue>) {
  console.log(access);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const setAgences = useListAgences((state) => state.setAgences);

  const [selectedCode, setSelectedCode] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState<String>(searchParams.get("code") || "");
  const [sorting, setSorting] = useState<SortingState>([]);

  const [loadingTable, setLoadingTable] = useState(false);

  if (loadingTable) {
    return <div>Chargement......</div>;
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },

    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const [loader, setLoader] = useState(true);
  // effect
  useEffect(() => {
    setLoader(false);
    setAgences(agences);
  }, []);

  // render
  if (loader) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <div className="flex  items-center py-4 flex-wrap">
        <DataTableToolbar type="contactes" table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  className="p-0"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className=" px-2 py-1 cursor-pointer"
                      onClick={() =>
                        console.log(table.getRowModel().rows?.length)
                      }
                    >
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
          <TableRow>
            <TableCell className="font-bold">TOTAL Dossier:</TableCell>
            <TableCell className="font-bold">{totalAccout}</TableCell>
            <TableCell className="font-bold">TOT IMP:</TableCell>
            <TableCell className="font-bold">{total.mnt_imp || 0} </TableCell>
            <TableCell className="font-bold">TOT DEP:</TableCell>
            <TableCell className="font-bold">
              {total.depassement || 0}
            </TableCell>
            <TableCell className="font-bold">TOT IRR:</TableCell>
            <TableCell className="font-bold">
              {total.tot_creance || 0}
            </TableCell>
            <TableCell className="font-bold">TOT ENG:</TableCell>
            <TableCell className="font-bold">{total.tot_eng || 0}</TableCell>
          </TableRow>
        </Table>
      </div>
      <div className="mt-2 flex items-center justify-between px-2">
        <div className="flex items-center space-x-6 lg:space-x-8 mt-2">
          <div className="flex items-center space-x-2"></div>
        </div>

        <DataTablePagination
          TotalAccount={totalAccout}
          totalPages={totalPages}
          table={table}
        />
      </div>
    </>
  );
}
