"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
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
import { ListPlusIcon, SearchIcon } from "lucide-react";
import useAuthModal from "@/hooks/use-fonction-search-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDroitAccessByCodeFonction } from "@/actions/droit_accees.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTablePagination } from "@/components/shared/Data-Table-pagination";
import useAddDroitModal from "@/hooks/useAddDroitModal";

import useStore, { State } from "@/lib/droitStore";
import { droit_accees } from "@/Models/droit_accees.model";
import toast from "react-hot-toast";
import { getSession } from "@/lib";

interface DataTableProps<droit_accees, TValue> {
  columns: ColumnDef<droit_accees, TValue>[];
}

export function DataTable<droit_accees, TValue>({
  columns,
}: DataTableProps<droit_accees, TValue>) {
  const [data, setData] = useState<droit_accees[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // const droitAccess = useStore((state: State) => state.droitAccess);
  // const fetchAllDroitAccess = useStore(
  //   (state: any) => state.fetchAllDroitAccess
  // );
  // console.log(droitAccess);

  // useEffect(() => {
  //   fetchAllDroitAccess();
  // }, [fetchAllDroitAccess]);

  const [droitAccess, setDroiAccess] = useStore(
    (state: State) => state.droitAccess
  );
  const fetchAllDroitAccess = useStore(
    (state: State) => state.fetchAllDroitAccess
  );
  const fetchDroitAccessByCodeFonction = useStore(
    (state: State) => state.fetchDroitAccessByCodeFonction
  );

  useEffect(() => {
    const Params = searchParams.get("code") || "";
    if (Params?.length > 0) {
      toast.promise(
        fetchDroitAccessByCodeFonction(Params).then((d: any) => {
          //console.log(d);
          setData(d as droit_accees[]);
        }),
        {
          loading: "Loading...",
          success: "Success",
          error: <b>Could not save.</b>,
        }
      );
    }
  }, [searchParams.get("code"), fetchDroitAccessByCodeFonction]);
  // useEffect(() => {
  //   const Params = searchParams.get("code") || "";
  //   if (Params?.length > 0) {
  //     console.log(searchParams.get("code") || "");
  //   }

  //   const d = useStore((state: State) => state.droitAccess);
  //   setData(d as droit_accees[]);
  //   console.log(data);
  // const fetchData = async () => {
  //   setIsLoading(true);
  //   const res = await getDroitAccessByCodeFonction(Params)
  //     .then((data) => {
  //       setData(data);
  //       console.log("not");
  //     })
  //     .then(() => {
  //       console.log("finish");
  //       setIsLoading(false);
  //     });
  // };
  // fetchData();
  //}, [searchParams.get("code")]);

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

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Module..."
          value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nom")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          variant="outline"
          onClick={() => onOpen()}
          className="mr-auto w-auto ml-1 "
        >
          Search for fonction
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mr-1">
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              View
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
          Add Droit
        </Button>
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
      <DataTablePagination table={table} />
    </>
  );
}
