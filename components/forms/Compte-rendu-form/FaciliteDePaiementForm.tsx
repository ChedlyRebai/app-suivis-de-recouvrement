"use client"
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useListeAgencestModal from "@/hooks/useListeAgences";
import { ListIcon } from "lucide-react";
import React from "react";

const FaciliteDePaiementForm = () => {
  const {onOpen}=useListeAgencestModal()
  return (
    <div className="my-2 grid grid-flow-col grid-cols-4 grid-rows-4 gap-3 ">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="MontantImpaye">Montant Impaye</Label>
        <Input id="MontantImpaye" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Nombreech">Nombre echeance</Label>
        <Input id="Nombreech" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant1ere">Montant 1ére éch</Label>
        <Input id="Montant1ere" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant2ere">Montant 2ére éch</Label>
        <Input id="Montant2ere" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5"></div>
      <div className="grid w-full max-w-sm items-center gap-1.5"></div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date1éreEcheance">Date 1ére Echeance</Label>
        <DatePickerDemo />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date2éreEcheance">Date 2ére Echeance</Label>
        <DatePickerDemo />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant3ere">Montant 3ére éch</Label>
        <Input id="Montant3ere" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant4ere">Montant 4ére éch</Label>
        <Input id="Montant4ere" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant5ere">Montant 5ére éch</Label>
        <Input id="Montant5ere" type="text" />
      </div>
      <div className="grid   items-center gap-1.5 col-span-2">
        <Label htmlFor="Lieu">Lieu</Label>
        <div className="flex">
        <Button className="px-2 mr-2" onClick={onOpen}>
          <ListIcon />
        </Button>
        <Input id="Lieu" type="text" />       
        </div>     
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date3éreEcheance">Date 3ére Echeance</Label>
        <DatePickerDemo />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date4éreEcheance">Date 4ére Echeance</Label>
        <DatePickerDemo />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date5éreEcheance">Date 5ére Echeance</Label>
        <DatePickerDemo />
      </div>
    </div>
  );
};

export default FaciliteDePaiementForm;
