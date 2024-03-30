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
import * as React from "react";
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

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  type: "contactes" | "noncontactes";
}


export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [groupes, setGroupes] = useState<any>([]);
  const [agences, setAgences] = useState<any>([]);
  const { replace } = useRouter();
  const pathname = usePathname();

  const [agenceopen, setagenceOpen] = useState(false);
  const [groupopen, setgroupOpen] = useState(false);
  const [agenceValue, setAgenceValue] = useState("");
  const [groupeValue, setgroupeValue] = useState("");
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
  };

  useEffect(() => {
    const fetchGroupes = async () => {
      try {
        const groupesData = await getGroupes();
        setGroupes(groupesData);
        console.log(groupesData);
      } catch (error) {
        console.error("Error fetching groupes:", error);
      }
    };

    const fetchAgences = async () => {
      try {
        const agencesData = await getAgences();

         setAgences(agencesData);
        console.log(agencesData);
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
      {/* <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {groupes.map((item:any) => (
              <CommandItem
                key={item.groupe}
                value={item.groupe}
                onSelect={(currentValue) => {
                  handleGroup(currentValue)
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.groupe ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.groupe}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover> */}

      {/* {table.getColumn("agence") && (
          <DataTableFacetedFilter
            column={table.getColumn("agence")}
            title="Agence"
            options={statuses}
          />
        )} */}
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
      <div className="w-1"/>
      <Popover  open={groupopen} onOpenChange={setgroupOpen}>
      <PopoverTrigger asChild>
  <Button
    variant="outline"
    role="combobox"
    aria-expanded={groupopen}
    className="w-[200px] justify-between"
  >
    {searchParams.get("groupe")
    ? (groupes.find(
        (groupe: any) => groupe.groupe == searchParams.get("groupe")
      )?.groupe) || "Sélectionner un groupe"
    : "Sélectionner un groupe"}
  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
</Button>
</PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 ml-2">
          <Command>
            <CommandInput placeholder="Search group" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {groupes.map((item: any,i:number) => (
                <CommandItem
                  key={i}
                  value={item.groupe}
                  onSelect={(currentValue) => {
                    handleGroup(item.groupe);
                    console.log(currentValue);
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
{/* 
      <Select
        defaultValue={searchParams.get("groupe")?.toString()}
        onValueChange={(value) => {
          handleGroup(value);
          console.log(value);
        }}
      >
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
      </Select> */}

      {/* {table.getColumn("groupe") && (
          <DataTableFacetedFilter
            column={table.getColumn("groupe")}
            title="Groupe"
            options={priorities}
          />
        )} */}

      {/* <Select
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
              return <SelectItem value={item.codug}>{item.libelle}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select> */}

      {isFiltered && (
        <Button
          variant="default"
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
