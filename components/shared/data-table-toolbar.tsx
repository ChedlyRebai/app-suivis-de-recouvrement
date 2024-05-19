"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "../../app/[locale]/(root)/listeclient/_components/contactes/data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
import { DataTableViewOptions } from "@/components/shared/data-table-view-options";
import { Oval } from "react-loading-icons";

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
  const [groupLoading, setGroupLoading] = useState(false);
  const [agenceLoading, setAgenceLoading] = useState(false);
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
        setGroupLoading(true);
        const groupesData = await getGroupes();

        setGroupes(groupesData);
        console.log("groupes", groupesData);
      } catch (error) {
        console.error("Error fetching groupes:", error);
      } finally {
        setGroupLoading(false);
      }
    };

    const fetchAgences = async () => {
      try {
        setAgenceLoading(true);
        const agencesData = await getAgences();
        setAgences(agencesData);
      } catch (error) {
        console.error("Error fetching agences:", error);
      } finally {
        setAgenceLoading(false);
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
      <Popover open={agenceopen} onOpenChange={setagenceOpen}>
        {/* <PopoverTrigger asChild>
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
        </PopoverTrigger> */}
        <PopoverTrigger asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={agenceopen}
            className="w-[200px] justify-between"
          >
            {searchParams.get("agence")}
            {searchParams.get("agence")
              ? agences.find(
                  (framework: any) =>
                    framework.codug === searchParams.get("agence")
                )?.libelle || "Sélectionner un agence"
              : "Sélectionner un agence"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0 ml-2">
          <Command>
            <CommandInput placeholder="Search agence" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {agenceLoading ? (
                <CommandItem className="text-center w-full flex justify-center">
                  <Oval className="text-center w-7 flex justify-center" />
                </CommandItem>
              ) : (
                agences.map((item: any) => (
                  <CommandItem
                    key={item.codug}
                    className="flex justify-start"
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
                    {item.codug}:{item.libelle}
                  </CommandItem>
                ))
              )}
              {/* {agences.map((item: any) => (
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
                  {item.codug}:{item.libelle}
                </CommandItem>
              ))} */}
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
              {groupLoading ? (
                <CommandItem className="text-center w-full flex justify-center">
                  <Oval className="text-center w-7 flex justify-center" />
                </CommandItem>
              ) : (
                groupes.map((item: any) => (
                  <CommandItem
                    key={item.groupe}
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
                        groupeValue === item.groupe
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {item.codug}:{item.libelle}
                  </CommandItem>
                ))
              )}
              {/* {groupes.map((item: any, i: number) => (
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
                  {item.codug}:{item.libelle}
                </CommandItem>
              ))} */}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
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
