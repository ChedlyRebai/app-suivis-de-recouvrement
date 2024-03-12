"use client";

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
  Row,
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
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import useAuthModal from "@/hooks/use-fonction-search-modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  console.log(data);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const test = () => {
    searchParams.append();
  };

  const { isOpen, onOpen, onClose } = useAuthModal();
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
  const [selectedCode, setSelectedCode] = useState("");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams, selectedCode]
  );
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState<String>(searchParams.get("code") || "");
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
  const lang = useTranslations();

  return (
    <>
      <div className="flex items-center py-">
        <Input
          placeholder="Filter code_fonction"
          value={selectedCode}
          onChange={(event) => {
            //setInputValue(event.target.value);
            setSelectedCode(event.target.value);
            table
              .getColumn("code_fonction")
              ?.setFilterValue(event.target.value as unknown as number);
          }}
          className="max-w-sm"
        />
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
                  className="cursor-pointer "
                  onClick={() => {
                    setInputValue(
                      (row.original as { code_fonction: string }).code_fonction
                    );
                    onClose();
                    router.push(
                      pathname +
                        "?" +
                        createQueryString(
                          "code",
                          `${
                            (row.original as { code_fonction: string })
                              .code_fonction
                          }`
                        )
                    );
                    if (
                      selectedCode ===
                      (row.original as { code_fonction: string }).code_fonction
                    ) {
                      setSelectedCode("");
                    } else {
                      setSelectedCode(
                        (row.original as { code_fonction: string })
                          .code_fonction
                      );
                    }
                  }}
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
      <div className="flex items-center justify-end space-x-2 ">
        {/* <Button
          onClick={() => {
            onClose();
            router.push(
              pathname + "?" + createQueryString("code", `${selectedCode}`)
            );
          }}
          variant="default"
          size="sm"
        >
          OK
        </Button> */}
        <Button onClick={() => onClose()} variant="outline" size="sm">
          {lang("funcModal.cancel")}
        </Button>
      </div>
    </>
  );
}
