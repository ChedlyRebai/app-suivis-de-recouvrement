import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalPages: number;
  TotalAccount?: number;
}

export function DataTablePagination<TData>({
  table,
  totalPages,
  TotalAccount,
}: DataTablePaginationProps<TData>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 5;
  const params = new URLSearchParams(searchParams);
  const createPageURL = (pageNumber: number | string) => {
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const createAccountURL = (perPage: number | string) => {
    params.set("perPage", perPage.toString());
    console.log("perPage", perPage);
    return `${pathname}?${params.toString()}`;
  };

  const lang = useTranslations();

  return (
    <div className="mt-2 flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{lang("pagination.rpp")}</p>
          <Select
            value={`${perPage}`}
            onValueChange={(value) => {
              const newUrl = createAccountURL(value);
              window.location.href = newUrl;
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 8, 10, 20, 30, 40, 50, 80]
                .filter((pageSize) => pageSize <= TotalAccount!!)
                .map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} {lang("pagination.of")} {totalPages - 1}
        </div>
        <div className="flex items-center space-x-2">
          {" "}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            // onClick={() => table.setPageIndex(0)}
            // disabled={!table.getCanPreviousPage()}
          >
            <Link
              href={createPageURL(1)}
              className={
                currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
              }
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>{" "}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            // onClick={() => table.previousPage()}
            // disabled={!table.getCanPreviousPage()}
          >
            <Link
              href={createPageURL(currentPage - 1)}
              className={
                currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
              }
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            // onClick={() => table.nextPage()}
            // disabled={!table.getCanNextPage()}
          >
            <Link
              href={createPageURL(currentPage + 1)}
              className={
                currentPage >= totalPages
                  ? `pointer-events-none opacity-50`
                  : ""
              }
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            // disabled={!table.getCanNextPage()}
          >
            <Link
              href={createPageURL(totalPages - 1)}
              className={
                currentPage >= totalPages
                  ? `pointer-events-none opacity-50`
                  : ""
              }
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
