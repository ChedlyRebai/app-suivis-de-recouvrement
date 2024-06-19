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
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useListAgences from "@/hooks/use-agences-list";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Access } from "@/actions/acess.action";

interface DataTableProps<TData, TValue> {
  columns: any[];
  total: any;
  data: TData[];
  totalAccout?: number;
  totalPages?: number;
  groupes: any[];
  agences: any[];
  access?: Access;
  type: "contactes" | "noncontactes";
}

export function DataTableContactes<TData, TValue>({
  columns,
  data,
  totalAccout,
  totalPages = 0,
  total,
  agences,
  groupes,
  type,
  access,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
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
  const [agenceopen, setagenceOpen] = useState(false);
  const [groupopen, setgroupOpen] = useState(false);
  const [agenceValue, setAgenceValue] = useState("");
  const [groupeValue, setgroupeValue] = useState("");

  const [loadingTable, setLoadingTable] = useState(false);
  // useEffect(() => {
  //   setInputValue(searchParams.get("query") || "");
  //   setLoadingTable(true);
  //   const params = new URLSearchParams(searchParams);
  //   params.delete("agence");
  //   params.delete("groupe");
  //   params.delete("query");
  //   params.delete("page");
  //   params.delete("perPage");
  //   params.delete("from");
  //   params.delete("to");
  //   replace(`${pathname}?${params.toString()}`);
  //   setLoadingTable(false);
  // }, [type]);

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
    meta: {
      access,
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams, selectedCode]
  );

  const [loader, setLoader] = useState(true);
  // effect
  useEffect(() => {
    setLoader(false);
    setAgences(agences);
  }, []);

  if (loader) {
    return <div>Chargement...</div>;
  }
  return (
    <>
      <div className="flex  items-center py-4 flex-wrap">
        <DataTableToolbar table={table} type="contactes" />
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
                  onDoubleClick={() => {
                    console.log((row.original as { cli: string }).cli);

                    router.push(
                      "compte-rendu" +
                        "?" +
                        createQueryString(
                          "cli",
                          `${(row.original as { cli: string }).cli}`
                        )
                    );
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p-2 cursor-pointer"
                      onClick={(e) => console.log(e)}
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
            <TableCell className="font-bold">
              TOTAL Dossier: {totalAccout}
            </TableCell>
            <TableCell className="font-bold">
              TOT IMP: {total.mnt_imp}{" "}
            </TableCell>
            <TableCell className="font-bold">
              TOT DEP: {total.depassement}
            </TableCell>
            <TableCell className="font-bold">
              TOT IRR: {total.tot_creance}
            </TableCell>
            <TableCell className="font-bold">
              TOT ENG: {total.engagement}
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <DataTablePagination
        TotalAccount={totalAccout}
        totalPages={totalPages}
        table={table}
      />
    </>
  );
}
