"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAgences, getGroupes } from "@/actions/client.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}



export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [groupes, setGroupes] = useState([]);
  const [agences, setAgences] = useState([]);
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
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
  }
  useEffect(() => {
    const fetchGroupes = async () => {
      try {
        const groupesData = await getGroupes();
        setGroupes(groupesData);
      } catch (error) {
        console.error("Error fetching groupes:", error);
      }
    };
    const fetchAgences = async () => {
      try {
        const agencesData = await getAgences();
        console.log(agencesData);
        setAgences(agencesData);
      } catch (error) {
        console.error("Error fetching agences:", error);
      }
    };
    fetchAgences();
    fetchGroupes();
  }, []);
  return (
    <>
      <Input
        placeholder="Client ID"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="max-w-sm mr-2"
      />
      {/* {table.getColumn("agence") && (
          <DataTableFacetedFilter
            column={table.getColumn("agence")}
            title="Agence"
            options={statuses}
          />
        )} */}
      <Select
       defaultValue={searchParams.get("groupe")?.toString()}
       onValueChange={(value) => {
         handleGroup(value);
         console.log(value);
       }}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select a Group" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {groupes.map((item: any) => {
              console.log(item);
              return <SelectItem value={item.groupe}>{item.groupe}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* {table.getColumn("groupe") && (
          <DataTableFacetedFilter
            column={table.getColumn("groupe")}
            title="Groupe"
            options={priorities}
          />
        )} */}

      <Select
        defaultValue={searchParams.get("agence")?.toString()}
        onValueChange={(value) => {
          handleAgence(value);
          console.log(value);
        }}
      >
        <SelectTrigger className="ml-2 w-fit">
          <SelectValue placeholder="Select a Agebce" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {agences.map((item: any) => {
              console.log(item);
              return <SelectItem value={item.codug}>{item.libelle}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className=""
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}

      <DataTableViewOptions table={table} />
    </>
  );
}
