"use client";

import { Cross2Icon, ResetIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAgences, getGroupes } from "@/actions/client.action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import * as React from "react";
import { Check, ChevronsUpDown, RefreshCcwIcon } from "lucide-react";
import Cookies from "js-cookie";
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
import { decodeJwt, jwtDecrypt } from "jose";
import { Card, CardContent } from "../ui/card";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  type?: "contactes" | "noncontactes";
}

export function DataTableToolbar<TData>({
  table,
  type,
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
  }, 50);

  const resetAgence = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("agence");
    replace(`${pathname}?${params.toString()}`);
  };

  const resetAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("groupe");
    params.delete("agence");

    replace(`${pathname}?${params.toString()}`);
  };
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
  const token = Cookies.get("session");
  const userConnected: any = decodeJwt(token as string);
  console.log("code_function", userConnected.code_function);

  let zoneBtnDiasbled = false;
  let agenceBtnDiasbled = false;

  // if (userConnected.code_function === 14) {
  //   zoneBtnDiasbled = true;
  //   agenceBtnDiasbled = true;
  // }

  if (userConnected.code_function === 11) {
    zoneBtnDiasbled = true;
    agenceBtnDiasbled = true;
  }

  if (userConnected.code_function === 13) {
    zoneBtnDiasbled = true;
    agenceBtnDiasbled = false;
  }

  return (
    <>
      <Input
        placeholder="Cli"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="max-w-sm mr-2"
      />
      <Popover open={agenceopen} onOpenChange={setagenceOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={agenceBtnDiasbled}
            role="combobox"
            aria-expanded={agenceopen}
            className="w-[200px] justify-between"
          >
            {searchParams.get("agence")
              ? agences.find(
                  (framework: any) =>
                    framework.codug === Number(searchParams.get("agence"))
                )?.libelle || "Sélectionner un agence"
              : "Sélectionner un agence"}

            {}
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
                  {item.codug}: {item.libelle}
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
            disabled={zoneBtnDiasbled}
            variant={"outline"}
            role="combobox"
            aria-expanded={groupopen}
            className="w-[200px] justify-between"
          >
            {searchParams.get("groupe")
              ? groupes.find(
                  (framework: any) =>
                    framework.codug === Number(searchParams.get("groupe"))
                )?.libelle || "Sélectionner un groupe"
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
                  key={item.codug}
                  value={item.libelle}
                  onSelect={(currentValue) => {
                    handleGroup(item.codug);
                    setgroupeValue(
                      item.codug === searchParams.get("groupe")
                        ? ""
                        : item.codug
                    );
                    setgroupOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      groupeValue === item.codug ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.codug}:{item.libelle}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {/* {type === "contactes" && (
        <Card className="h-10">
          <CardContent className="flex items-center justify-center my-1">
            <p>Nombre de jour :</p>
            <Input
              type="number"
              className="w-16 h-8"
              // onChange={(e) => handleFrom(e.target.value)}
              placeholder="De"
            />
            <p className="mx-1">à</p>
            <Input
              type="number"
              className="w-16 h-8"
              // onChange={(e) => handleTo(e.target.value)}
              placeholder="à"
            />
          </CardContent>
        </Card>
      )} */}
      <Button className="ml-auto mr-1" variant="destructive" onClick={resetAll}>
        <ResetIcon className="h-4 w-4" />
      </Button>

      <DataTableViewOptions table={table} />
    </>
  );
}
