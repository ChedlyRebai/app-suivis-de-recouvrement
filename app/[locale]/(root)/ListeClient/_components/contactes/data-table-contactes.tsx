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

import { Cross2Icon } from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAgences, getGroupes } from "@/actions/client.action";

import { Check, ChevronsUpDown } from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { DataTableToolbar } from "./data-table-toolbar";
import React, { useCallback, useEffect, useState } from "react";
import { ab_client } from "@/Models/ab_client.model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useListAgences from "@/hooks/use-agences-list";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  total: any;
  data: TData[];
  totalAccout?: number;
  totalPages?: number;
  groupes: any[];
  agences: any[];
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
  type
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const setAgences=useListAgences((state)=>state.setAgences)
  setAgences(agences)
  
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
  
  
  const handleAgence = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("agence", query);
      params.set("page", "1");
    } 
    console.log(params.get("groupe")?.toString());
    replace(`${pathname}?${params.toString()}`);
  }, 0);


  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("agence");
    params.delete("groupe");
    replace(`${pathname}?${params.toString()}`);
  }, [type])
  
  


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

  return (
    <>
      <div className="flex  items-center py-4 flex-wrap">
      <>
      <Input
        placeholder="Client ID"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="max-w-sm mr-2"
      />
      <Popover open={agenceopen} onOpenChange={setagenceOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
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
                      agenceValue === item.codug ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.libelle}
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
            variant="outline"
            role="combobox"
            aria-expanded={groupopen}
            className="w-[200px] justify-between"
          >
            {searchParams.get("groupe")
              ? groupes.find(
                  (groupe: any) => groupe.groupe == searchParams.get("groupe")
                )?.groupe || "Sélectionner un groupe"
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
                  key={i}
                  value={item.groupe}
                  onSelect={(currentValue) => {
                    handleGroup(item.groupe);
                    setgroupeValue(
                      item.groupe == searchParams.get("groupe")
                        ? ""
                        : item.groupe
                    );
                    setgroupOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      groupeValue === item.groupe ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {item.groupe}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
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
                    <TableHead key={header.id} className="px-2">
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
                  No results.
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
