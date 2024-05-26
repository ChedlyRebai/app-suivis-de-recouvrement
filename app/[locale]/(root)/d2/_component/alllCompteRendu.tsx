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
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTableViewOptions } from "@/components/shared/data-table-view-options";
import { CompteRendu, Utilisateur } from "@/actions/admin.action";
import { utilisateur } from "@/Models/utilisateur.model";
import CompteRenduModal from "@/components/shared/Modals/Compte-Rendu-Modal";
import useCompteRenduModal from "@/hooks/use-compte-rendu-modal";

interface DataTableProps {
  columns: any[];

  data: CompteRendu[];
  totalAccout?: number;
  totalPages?: number;
}

export function AllCompteRendu({
  columns,
  data,
  totalAccout,
  totalPages = 0,
}: DataTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const setAgences = useListAgences((state) => state.setAgences);
  console.log(data);

  const [selectedCode, setSelectedCode] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState<String>(searchParams.get("code") || "");
  const [sorting, setSorting] = useState<SortingState>([]);

  // const [groupes, setGroupes] = useState<any>([]);
  // const [agences, setAgences] = useState<any>([]);
  const { isOpen, onClose, onOpen } = useCompteRenduModal();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
      params.set("page", "1");
    } else {
      params.delete("query");
    }
    console.log(params.get("query")?.toString());
    replace(`${pathname}?${params.toString()}`);
  }, 100);

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
  }, []);

  // render
  if (loader) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem> */}

          <BreadcrumbItem>
            <BreadcrumbLink href="/en/d2">Tableau de bord </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Comptes rendus</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Compte Rendus</CardTitle>
          <CardDescription>Gérez vos Compte Rendus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center py-4 flex-wrap">
            <>
              <Input
                placeholder="Cli"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                className="max-w-sm mr-2"
              />
              <div className="w-1" />

              <DataTableViewOptions table={table} />
            </>
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
                      className="p-"
                      // onDoubleClick={() => {
                      //   console.log((row.original as { cli: string }).cli);

                      //   router.push(
                      //     "compte-rendu" +
                      //       "?" +
                      //       createQueryString(
                      //         "cli",
                      //         `${(row.original as { cli: string }).cli}`
                      //       )
                      //   );
                      // }}
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
          </div>
        </CardContent>
        <CompteRenduModal />
      </Card>
    </>
  );
}
