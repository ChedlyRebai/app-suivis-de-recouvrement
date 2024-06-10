"use client";
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

import { Check, ChevronsUpDown, File, RefreshCcwIcon } from "lucide-react";

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
import { Client, Utilisateur, exportClient } from "@/actions/admin.action";
import { utilisateur } from "@/Models/utilisateur.model";
import { on } from "events";
import Link from "next/link";
import { getAgences, getGroupes } from "@/actions/client.action";
import { ResetIcon } from "@radix-ui/react-icons";

interface DataTableProps {
  columns: any[];
  onExport?: (data: any) => void;
  data: Client[];
  totalAccout?: number;
  totalPages?: number;
}

export function AllClient({
  columns,
  data,
  totalAccout,
  totalPages = 0,
  onExport,
}: DataTableProps) {
  const [groupes, setGroupes] = useState<any>([]);
  const [agences, setAgences] = useState<any>([]);
  const { replace } = useRouter();
  const pathname = usePathname();

  const [agenceopen, setagenceOpen] = useState(false);
  const [groupLoading, setGroupLoading] = useState(false);
  const [agenceLoading, setAgenceLoading] = useState(false);
  const [groupopen, setgroupOpen] = useState(false);
  const [agenceValue, setAgenceValue] = useState("");
  const [groupeValue, setgroupeValue] = useState("");

  const resetAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("groupe");
    params.delete("agence");

    replace(`${pathname}?${params.toString()}`);
  };
  const handleGroup = (group: string) => {
    const params = new URLSearchParams(searchParams);
    if (group) {
      params.set("groupe", group);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleAgence = (agence: string) => {
    const params = new URLSearchParams(searchParams);
    if (agence) {
      params.set("agence", agence);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchGroupes = async () => {
      try {
        setGroupLoading(true);
        const groupesData = await getGroupes();

        setGroupes(groupesData);
        console.log("groupes", groupesData);
      } catch (error) {
        console.error("Error fetching groupes:", error);
      } finally {
        setGroupLoading(false);
      }
    };

    const fetchAgences = async () => {
      try {
        setAgenceLoading(true);
        const agencesData = await getAgences();
        setAgences(agencesData);
      } catch (error) {
        console.error("Error fetching agences:", error);
      } finally {
        setAgenceLoading(false);
      }
    };

    fetchAgences();
    fetchGroupes();
  }, []);

  const router = useRouter();

  const searchParams = useSearchParams();

  const [selectedCode, setSelectedCode] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState<String>(searchParams.get("code") || "");
  const [sorting, setSorting] = useState<SortingState>([]);

  // const [groupes, setGroupes] = useState<any>([]);
  // const [agences, setAgences] = useState<any>([]);

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
            <BreadcrumbPage>Clients</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Gérez vos Clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-betwee items-center py-4 flex-wrap">
            <>
              <Input
                placeholder="Cli"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                className="max-w-sm mr-2"
              />
              <div className="flex mr-auto">
                <Popover open={agenceopen} onOpenChange={setagenceOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      role="combobox"
                      aria-expanded={agenceopen}
                      className="w-[200px] justify-between"
                    >
                      {searchParams.get("agence")
                        ? agences.find(
                            (framework: any) =>
                              framework.codug ===
                              Number(searchParams.get("agence"))
                          )?.libelle || "Sélectionner un agence"
                        : "Sélectionner un agence"}

                      {}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search agence" />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {agences.map((item: any) => (
                          <CommandItem
                            key={item.codug}
                            value={item.libelle}
                            onSelect={(currentValue) => {
                              handleAgence(item.codug);
                              setAgenceValue(
                                item.codug === searchParams.get("agence")
                                  ? ""
                                  : item.codug
                              );

                              setagenceOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                agenceValue === item.codug
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.codug}: {item.libelle}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <div className="w-1" />
                <Popover open={groupopen} onOpenChange={setgroupOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      role="combobox"
                      aria-expanded={groupopen}
                      className="w-[200px] justify-between"
                    >
                      {searchParams.get("groupe")
                        ? groupes.find(
                            (framework: any) =>
                              framework.codug ===
                              Number(searchParams.get("groupe"))
                          )?.libelle || "Sélectionner un groupe"
                        : "Sélectionner un groupe"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0 ml-2">
                    <Command>
                      <CommandInput placeholder="Search group" />
                      <CommandEmpty>No framework found.</CommandEmpty>

                      <CommandGroup>
                        {groupes.map((item: any, i: number) => (
                          <CommandItem
                            key={item.codug}
                            value={item.libelle}
                            onSelect={(currentValue) => {
                              handleGroup(item.codug);
                              setgroupeValue(
                                item.codug === searchParams.get("groupe")
                                  ? ""
                                  : item.codug
                              );
                              setgroupOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                groupeValue === item.codug
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.codug}:{item.libelle}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <Popover open={agenceopen} onOpenChange={setagenceOpen}>
                {/* <PopoverTrigger asChild>
              <Button
                variant="default"
                role="combobox"
                aria-expanded={agenceopen}
                className="w-[200px] justify-between"
              >
                {searchParams.get("agence")
                  ? agences.find(
                      (framework: any) =>
                        framework.codug === searchParams.get("agence")
                    )?.libelle || "Sélectionner un agence"
                  : "Sélectionner un agence"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger> */}

                {/* <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search agence" />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {agences.map((item: any) => (
                    <CommandItem
                      key={item.codug}
                      value={item.libelle}
                      onSelect={(currentValue) => {
                        handleAgence(item.codug);
                        setAgenceValue(
                          item.codug === searchParams.get("agence")
                            ? ""
                            : item.codug
                        );

                        setagenceOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          agenceValue === item.codug
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.codug}: {item.libelle}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent> */}
              </Popover>

              <div>
                <Link href="https://release4.vercel.app/client/exfclient">
                  <Button variant="outline" className=" gap-1 mr-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      PDF
                    </span>{" "}
                  </Button>{" "}
                </Link>
                <Link href="https://release4.vercel.app/client/exclient">
                  <Button variant="outline" className=" gap-1 mr-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Excel
                    </span>
                  </Button>
                </Link>
                <Button
                  className="ml-auto mr-1"
                  variant="destructive"
                  onClick={resetAll}
                >
                  <ResetIcon className="h-4 w-4" />
                </Button>
                <DataTableViewOptions table={table} />
              </div>
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
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onDoubleClick={() => {
                        router.push(
                          "client" +
                            "?" +
                            createQueryString("id", `${row.original.id}`)
                        );
                      }}
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
      </Card>
    </>
  );
}
