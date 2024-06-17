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

import { Popover } from "@/components/ui/popover";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/shared/Data-Table-pagination";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTableViewOptions } from "@/components/shared/data-table-view-options";
import { File } from "@/Models/file.model";
import OpenModelButton from "../../d2/client/_component/Documents/openModelButton";
import { Access } from "@/actions/acess.action";
import UploadFiles from "@/components/shared/Modals/Upload-file-Modal";
import useUploadFileModal from "@/hooks/use-UploadFile-Modal";

interface DataTableProps {
  columns: any[];
  data: File[];
  totalAccout?: number;
  totalPages?: number;
  access: Access;
}

export function FileTable({
  columns,
  data,
  totalAccout,
  totalPages = 0,
  access,
}: DataTableProps) {
  console.log(data);
  console.log(access);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [loadingTable, setLoadingTable] = useState(false);

  if (loadingTable) {
    return <div>Chargement......</div>;
  }
  const { setID, id } = useUploadFileModal();
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

  const [loader, setLoader] = useState(true);
  // effect
  useEffect(() => {
    setLoader(false);
    setID(2);
  }, []);

  // render
  if (loader) {
    return <div>Chargement...</div>;
  }

  return (
    <>
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
                  className="p-"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="p- cursor-pointer"
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
        <UploadFiles />
      </div>
    </>
  );
}
