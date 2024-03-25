"use client"
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
import { heureVisite } from "@/constants";
import useClientSore from "@/hooks/useCompteRenduForm";
import useListeAgencestModal from "@/hooks/useListeAgences";
import { ListIcon } from "lucide-react";
import React from "react";

const VisiteForm = () => {
  const { client, handleIputChangeSuiviAgenda, suiviAgenda } = useClientSore();
  const {onOpen,setColumn,column}=useListeAgencestModal()
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
              {heureVisite.map((item) => (
                <SelectItem value={`${item.Code}`}>{item.libelle}H</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-[280px] items-center gap-1.5">
        <Label htmlFor="lieuvisite">Lieu visite</Label>
        <div className="flex ">
            <Button className="w- px-2"  onClick={() =>{
                onOpen();
                console.log("bonjour")
                setColumn("lieu_visite")
                console.log("cc:",column)
               }}>
              <ListIcon />
            </Button>
            <Input className="border p-2 ml-2" value={suiviAgenda.lieu_visite} id="location" placeholder="Lieu" />
          </div>
      </div>
    </div>
  );
};

export default VisiteForm;
