"use client";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useDebouncedCallback } from "use-debounce";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ListPlusIcon, SearchIcon } from "lucide-react";
import useAuthModal from "@/hooks/use-fonction-search-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DataTablePagination } from "@/components/shared/Data-Table-pagination";
import useAddDroitModal from "@/hooks/useAddDroitModal";

import useStore, { State } from "@/lib/droitStore";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Oval } from "react-loading-icons";
import Pagination from "@/components/shared/pagination";

interface DataTableProps<droit_accees, TValue> {
  columns: ColumnDef<droit_accees, TValue>[];
}

export function HistoriqueCommentaireDataTable<
  droit_accees,
  TValue
>({columns}: DataTableProps<droit_accees, TValue>) {
  const [data, setData] = useState<droit_accees[]>([]);
  const [TotalPages, setTotalPages] = useState(0);
  const [TotalAccount, setTotalAccount] = useState(0);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 5;
  const search = searchParams?.get("query") || "";

  const [droitAccess, setDroiAccess] = useState<droit_accees[]>([]);

  const updateDroit = useStore((state: State) => state.updateDroit);

  const fetchAllDroitAccess = useStore(
    (state: State) => state.fetchAllDroitAccess
  );
  const fetchDroitAccessByCodeFonction = useStore(
    (state: State) => state.fetchDroitAccessByCodeFonction
  );

  const update = async (
    codef: number,
    id: number,
    value: string,
    champ: string
  ) => {
    console.log(codef, id, value, champ);
    const response = await updateDroit(id, codef, value, champ);
    console.log(response);
    // Find the index of the updated row in the data array
    const rowIndex = data.findIndex((row: any) => row.id === id);
    console.log(rowIndex);
    if (rowIndex !== -1) {
      // Create a copy of the data array
      const newData = [...data];
      // Update the specific row
      newData[rowIndex] = { ...newData[rowIndex], [champ]: value };
      // Set the updated data
      console.log(newData);
      setData(newData);
    }
  };

  useEffect(() => {
    console.log("data table params", currentPage, perPage);
    const Params = searchParams.get("code") || "";
    if (Params?.length > 0) {
      setIsLoading(true);
      toast.promise(
        fetchDroitAccessByCodeFonction(Params, currentPage, perPage, search)
          .then((d: any) => {
            //console.log(d);
            setTotalPages(d.totalPages);
            setTotalAccount(d.totalCount);
            setData(d.permissions as droit_accees[]);
            // Move setIsLoading(false) inside the success callback
          })
          .then(() => setIsLoading(false)),
        {
          loading: "Loading...",
          success: "Success",
          error: <b>Could not save.</b>,
        }
      );
    }
  }, [searchParams, fetchDroitAccessByCodeFonction]);

  const lang = useTranslations();
  const { isOpen, onOpen } = useAuthModal();
  const { isOpen: isOpenAddDroit, onOpen: onOpenAddDroit } = useAddDroitModal();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
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

  console.log(data);
  const { replace } = useRouter();
  const pathname = usePathname();
  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
      params.set("page", "1");
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <>
      <div className="flex  items-center py-4 flex-wrap">
        <Input
          placeholder="Filter Module..."
          defaultValue={searchParams.get("query")?.toString()}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="max-w-sm"
        />
        <Button
          variant="outline"
          onClick={() => onOpen()}
          className="mr-auto w-auto ml-1 "
        >
          {lang("access-management.searchf")}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mr-1">
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              {lang("access-management.View")}
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
                    onCheckedChange={(checked: boolean) =>
                      column.toggleVisibility(checked)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => onOpenAddDroit()} variant="default" className="">
          <ListPlusIcon className="mr-2 h-4 w-4" />
          {lang("access-management.Add")}
        </Button>
      </div>
      
      <div className={`rounded-md border ${isLoading && "animate-pulse"}`}>
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
            {/* {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) :*/}

            {/* {isLoading ? (
              // Replace <div>Loading...</div> with your custom loading component
              <TableRow className="text-center">
                <TableCell>
                  <Oval />
                </TableCell>
              </TableRow>
            ) : ( */}
            <>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                // Replace <TableCell>No results.</TableCell> with your custom no results component
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </>
            {/* )} */}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        totalPages={TotalPages}
        TotalAccount={TotalAccount}
        table={table}
      />
    </>
  );
}
