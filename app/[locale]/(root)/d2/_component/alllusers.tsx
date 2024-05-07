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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTableViewOptions } from "@/components/shared/data-table-view-options";
import { Utilisateur } from "@/actions/admin.action";
import { utilisateur } from "@/Models/utilisateur.model";

interface DataTableProps {
  columns: any[];
  total: any;
  data: Utilisateur[];
  totalAccout?: number;
  totalPages?: number;
}

export function AllUsers({
  columns,
  data,
  totalAccout,
  totalPages = 0,
  total,
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

  const [agenceopen, setagenceOpen] = useState(false);
  const [groupopen, setgroupOpen] = useState(false);
  const [agenceValue, setAgenceValue] = useState("");
  const [groupeValue, setgroupeValue] = useState("");

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

  const handleGroup = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("groupe", query);
      params.set("page", "1");
    }
    console.log(params.get("groupe")?.toString());
    replace(`${pathname}?${params.toString()}`);
  }, 0);

  const handleFrom = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("from", query);
      params.set("page", "1");
    }
    console.log(params.get("from")?.toString());
    replace(`${pathname}?${params.toString()}`);
  }, 0);

  const handleTo = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (
      query === "" ||
      query === null ||
      query === undefined ||
      query === "0"
    ) {
      console.log(query);
      params.delete("to");
      params.set("page", "1");
    } else {
      params.set("to", query);
      params.set("page", "1");
    }
    console.log(params.get("to")?.toString());
    replace(`${pathname}?${params.toString()}`);
  }, 0);

  const handleAgence = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (
      query === "" ||
      query === null ||
      query === undefined ||
      query === "0"
    ) {
      console.log(query);
      params.delete("from");
      params.set("page", "1");
    }
    if (query) {
      params.set("agence", query);
      params.set("page", "1");
    }
    console.log(params.get("groupe")?.toString());
    replace(`${pathname}?${params.toString()}`);
  }, 0);

  const [loadingTable, setLoadingTable] = useState(false);

  if (loadingTable) {
    return <div>Loading...</div>;
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

  const resetAgence = () => {
    setAgenceValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("agence");
    replace(`${pathname}?${params.toString()}`);
  };

  const resetGroup = () => {
    setgroupeValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("groupe");
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setSearch(`${searchParams.get("code")}`);
    console.log(search);
  }, [searchParams.get("code")]);

  const addQuery = (row: any) => {
    console.log();
    router.push(
      pathname + "?" + createQueryString("code", `${selectedCode as string}`)
    );
  };
  const [loader, setLoader] = useState(true);
  // effect
  useEffect(() => {
    setLoader(false);
  }, []);

  // render
  if (loader) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Utilisateur</CardTitle>
          <CardDescription>Gérez vos utilisateurs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex  items-center py-4 flex-wrap">
            <>
              <Input
                placeholder="Cli"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                className="max-w-sm mr-2"
              />
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
              {/* <Button
            variant="default"
            className="font-black mx-1"
            onClick={resetAgence}
          >
            <RefreshCcwIcon className="font-b" />
          </Button> */}
              <div className="w-1" />
              {/* <Popover open={groupopen} onOpenChange={setgroupOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="default"
                role="combobox"
                aria-expanded={groupopen}
                className="w-[200px] justify-between"
              >
                {searchParams.get("groupe")
                  ? agences.find(
                      (framework: any) =>
                        framework.codug === searchParams.get("groupe")
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
          </Popover> */}
              {/* <Button
            variant="default"
            className="font-black mx-1"
            onClick={resetGroup}
          >
            <RefreshCcwIcon className="font-b" />
          </Button> */}

              {/* <Card className="h-10">
            <CardContent className="flex items-center justify-center my-1">
              <p>Nombre de jour :</p>
              <Input
                type="number"
                className="w-16 h-8"
                onChange={(e) => handleFrom(e.target.value)}
                placeholder="De"
              />
              <p className="mx-1">à</p>
              <Input
                type="number"
                className="w-16 h-8"
                onChange={(e) => handleTo(e.target.value)}
                placeholder="à"
              />
            </CardContent>
          </Card> */}

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
                      No results.
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
