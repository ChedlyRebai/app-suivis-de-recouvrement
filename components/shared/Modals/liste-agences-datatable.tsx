"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import useListeAgencestModal from "@/hooks/useListeAgences";
import { Button } from "@/components/ui/button";
import useClientSore from "@/hooks/useCompteRenduForm";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

}

export function ListeAgenceDataTable<TData, TValue>({
  columns,
  data,
 
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const { onClose,column } = useListeAgencestModal();
  const { handleIputChangeSuiviAgenda,suiviAgenda } = useClientSore();
  console.log(table)

  const handleChange=(e:any)=>{
    handleIputChangeSuiviAgenda(column,e.codug)
    console.log(column)
    console.log(suiviAgenda.lieu_visite)
    onClose()
  }

  return (
    <>
      <div className="flex items-center py-">
        <div className="flex items-center ">
          <Input
            type="number"
            placeholder="Filter codug..."
            value={(table.getColumn("codug")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("codug")?.setFilterValue(event.target.value)
            }
            className="max-w-sm "
          />
        </div>
        <Input
          placeholder="Filter libelle..."
          value={(table.getColumn("libelle")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("libelle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
      </div>
      <div className="rounded-md border max-h-60 overflow-auto">
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
                className="cursor-pointer"
                  onClick={() => handleChange(row.original)}
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
          OK
        </Button>
      </div>
    </>
  );
}
