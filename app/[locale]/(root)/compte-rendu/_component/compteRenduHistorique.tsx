// "use client";
// import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import React from "react";
// interface CompteRenduHistoriqueProps {
//   listHistorique: SuiviAgenda[];
// }
// const CompteRenduHistorique = ({
//   listHistorique,
// }: CompteRenduHistoriqueProps) => {
//   return (
//     <>
//       {/* <Table>
//       {/* <TableCaption>A list of your recent invoices.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[100px]">Nom</TableHead>
//           <TableHead>Date Compte Rendu</TableHead>
//           <TableHead colSpan={6} className="text-Right">Compte Rendu</TableHead>
//           <TableHead className="">Utilisateur</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {listHistorique && listHistorique.map((item:SuiviAgenda) => (
//           <TableRow key={item.num}>
//             <TableCell className="font-medium">{item.num}</TableCell>
//             <TableCell>{`${item.date_ag?.toLocaleTimeString}`}</TableCell>
//             <TableCell colSpan={6}>{item.compte_rendu}</TableCell>
//             <TableCell className="">{item.usr_nom}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//     */}

//       <div className="">
//         {/* <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A table of placeholder stock market data that does not make any sense.
//           </p>
//         </div>
//         <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
//           <button
//             type="button"
//             className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
//           >
//             Export
//           </button>
//         </div>
//       </div> */}
//         <div className="mt-8 flex flex-col">
//           <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//               <div className="overflow-hidden shadow ring-1 ring-black dark:ring-slate-500 ring-opacity-5 md:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 ">
//                   <thead className="bg-gray-50 dark:bg-inherit">
//                     <tr>
//                       <th
//                         scope="col"
//                         className="whitespace-nowrap dark:text-inherit py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
//                       >
//                         Nom
//                       </th>
//                       <th
//                         scope="col"
//                         className="dark:text-inherit whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
//                       >
//                         Date compte rendu
//                       </th>
//                       <th
//                         colSpan={3}
//                         scope="col"
//                         className="dark:text-inherit whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
//                       >
//                         Compte Rendu
//                       </th>
//                       <th
//                         scope="col"
//                         className="dark:text-inherit whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
//                       >
//                         Utilisateur
//                       </th>

//                       <th
//                         scope="col"
//                         className="dark:text-inherit relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
//                       >
//                         <span className="sr-only">Edit</span>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-inherit">
//                     {listHistorique.map((item,i) => (
//                       <tr key={i}>
//                         <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900 dark:text-inherit">
//                           {item.num}
//                         </td>
//                         <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900 dark:text-inherit">
//                         {item.date_ag ? item.date_ag.toString().split('T')[0] : ""}
//                         </td>
//                         <td
//                           className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-inherit"
//                           colSpan={3}
//                         >
//                           {item.compte_rendu}
//                         </td>
//                         <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-inherit">
//                           {item.usr_nom}
//                         </td>

//                         <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                           <a
//                             href="#"
//                             className="text-indigo-600 hover:text-indigo-900"
//                           >
//                             Edit<span className="sr-only">, {item.id}</span>
//                           </a>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CompteRenduHistorique;

"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Span } from "next/dist/trace";
import useCompteRenduModal from "@/hooks/use-compte-rendu-modal";
import CompteRenduModal from "@/components/shared/Modals/Compte-Rendu-Modal";

interface CompteRenduHistoriqueProps {
  listHistorique: SuiviAgenda[];
}

const CompteRenduHistorique = ({
  listHistorique: data,
}: CompteRenduHistoriqueProps) => {
  const { isOpen, onClose, onOpen } = useCompteRenduModal();

  const columns: ColumnDef<SuiviAgenda>[] = [
    {
      accessorKey: "num",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Num
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("num")}</div>
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "date_ag",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Compte Rendu
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {new Date(row.getValue("date_ag")).toLocaleDateString()}
        </div>
      ),
    },

    {
      accessorKey: "compte_rendu",
      header: ({ column }) => {
        return <span>Compte Rendu</span>;
      },

      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("compte_rendu")}</div>
      ),
    },

    {
      accessorKey: "usr_nom",
      header: ({ column }) => {
        return <span>Utilisateur</span>;
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("usr_nom")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: ({ column }) => {
        return <div>Action</div>;
      },
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <Button
            className="flex items-end h-full  justify-"
            variant="default"
            onClick={()=>onOpen({} as SuiviAgenda)}
          >
            <Pencil1Icon className="mr-1" />
            Edit
          </Button>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log(data);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("num")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("num")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="-2">
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
                  className="py-2 pl-2"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-2" key={cell.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <CompteRenduModal />
    </div>
  );
};

export default CompteRenduHistorique;
