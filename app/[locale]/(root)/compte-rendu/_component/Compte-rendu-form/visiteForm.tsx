"use client";
import { getHrdv } from "@/actions/motif.action";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

import useListAgences from "@/hooks/use-agences-list";
import useClientSore from "@/hooks/useCompteRenduForm";
import useListeAgencestModal from "@/hooks/useListeAgences";
import { ListIcon } from "lucide-react";
import React, { use, useEffect, useState } from "react";

const VisiteForm = () => {
  const getAgence = useListAgences((state) => state.getAgence);
  const [heureVisite, setHeureVisite] = useState<any>([]);
  const { client, handleIputChangeSuiviAgenda, suiviAgenda } = useClientSore();
  const { onOpen, setColumn, column } = useListeAgencestModal();
  useEffect(() => {
    const fetchhrdv = async () => {
      const hrdev = await getHrdv();
      setHeureVisite(hrdev);
    };
    fetchhrdv();
  }, [suiviAgenda]);
  return (
    <div className="grid grid-cols-1 gap-y-3 py-3">
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <Label htmlFor="Datevisite">Date visite</Label>
        <DatePickerDemo
          date={suiviAgenda.date_visite || ""}
          champ={"date_visite"}
          setDate={handleIputChangeSuiviAgenda}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="heureviste">heure visite</Label>
        <Select
          defaultValue={suiviAgenda.h_rdv}
          onValueChange={(e: string) => {
            handleIputChangeSuiviAgenda("h_rdv", e);
            console.log(suiviAgenda);
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select heure" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Heures</SelectLabel>
              {heureVisite.map((item: any, i: number) => (
                <SelectItem key={i} value={item.code}>
                  {item.libelle}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* <div className="grid w-[280px] items-center gap-1.5">
        <Label htmlFor="lieuvisite">Lieu visite</Label>
        <div className="flex ">
          
          <Input
            className="border p-2 ml-2"
            onChange={(e) => {
              handleIputChangeSuiviAgenda("lieu_visite", e.target.value);
            }}
            value={suiviAgenda.lieu_visite}
            id="location"
            placeholder="Lieu"
          />
        </div>
      </div> */}

      <div className="grid w-[280px] items-center gap-1.5">
        <Label htmlFor="Lieu">Lieu</Label>
        <div className="flex">
          <Button
            className="w- px-2"
            onClick={() => {
              onOpen();
              setColumn("lieu_visite");
            }}
          >
            <ListIcon />
          </Button>
          <div className="flex w-full">
            <Input
              readOnly
              id="Client"
              className="w-1/4 px-2 mr-1"
              value={suiviAgenda.lieu_visite}
              type="number"
              defaultValue={0}
            />
            <Input
              readOnly
              id="Client"
              className=""
              value={getAgence(suiviAgenda.lieu_visite)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiteForm;
