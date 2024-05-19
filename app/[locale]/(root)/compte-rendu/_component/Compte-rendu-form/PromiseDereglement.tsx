"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, List, ListIcon } from "lucide-react";
import React, { use, useEffect, useState } from "react";

import { format } from "date-fns";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import useListeAgencestModal from "@/hooks/useListeAgences";
import useClientSore from "@/hooks/useCompteRenduForm";
import useListAgences from "@/hooks/use-agences-list";
const PromiseDereglement = ({ montant }: { montant: number }) => {
  const [date, setdate] = useState(new Date());
  const { onOpen, setColumn } = useListeAgencestModal();
  const getAgence = useListAgences((state) => state.getAgence);
  const AGENCES = useListAgences((state) => state.listAgences);

  const { client, handleIputChangeSuiviAgenda, suiviAgenda, seTsuiAgenda } =
    useClientSore();
  //seTsuiAgenda({ ...suiviAgenda, mnt_reg: montant });
  useEffect(() => {
    seTsuiAgenda({ ...suiviAgenda, mnt_reg: montant });
  }, [montant]);
  return (
    <div className="">
      <div className="flex p-4 flex-col">
        <div className="flex w-[280px] flex-col my-1 mr-4">
          <Label className="mb-1 text-sm font-medium   " htmlFor="amount">
            Montant
          </Label>

          <Input
            className="border p-2"
            onChange={(e) =>
              handleIputChangeSuiviAgenda("mnt_reg", e.target.value)
            }
            defaultValue={client.tot_creance}
            id="amount"
            placeholder={`${client.tot_creance}`}
          />
        </div>

        <div className="flex w-[280px] flex-col my-1 mr-4">
          <Label className="mb-1 text-sm font-medium   " htmlFor="amount">
            Date
          </Label>
          <DatePickerDemo
            date={suiviAgenda.date_ver || ""}
            champ={"date_ver"}
            setDate={handleIputChangeSuiviAgenda}
          />
        </div>
        <div className="flex w-[280px] flex-col my-1 mr-">
          <Label className="mb-1 text-sm font-medium " htmlFor="location">
            Lieu
          </Label>
          <div className="flex ">
            <Button
              className="w- px-2"
              onClick={() => {
                onOpen();
                console.log("bonjour");
                setColumn("lieu_ver");
              }}
            >
              <ListIcon />
            </Button>

            <div className="flex ">
              <Input
                readOnly
                id="Client"
                className="w-1/4 px-2 mr-1"
                value={suiviAgenda.lieu_ver}
                type="number"
                defaultValue={0}
              />
              <Input
                readOnly
                id="Client"
                className=""
                value={getAgence(suiviAgenda.lieu_ver)}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseDereglement;
