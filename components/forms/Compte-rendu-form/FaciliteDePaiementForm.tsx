"use client";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClientSore from "@/hooks/useCompteRenduForm";
import useListeAgencestModal from "@/hooks/useListeAgences";
import { ListIcon } from "lucide-react";
import React from "react";

const FaciliteDePaiementForm = () => {
  const { onOpen,setColumn } = useListeAgencestModal();
  const { client, handleIputChangeSuiviAgenda, suiviAgenda, } = useClientSore();
  return (
    <div className="my-2 grid grid-flow-col grid-cols-4 grid-rows-4 gap-3 ">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="MontantImpaye">Montant Impaye</Label>
        <Input onChange={(e) =>
            handleIputChangeSuiviAgenda("nb_ech", e.target.value)
          }
          
          id="MontantImpaye" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Nombreech">Nombre echeance</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("nb_ech", e.target.value)
          }
          id="Nombreech"
          value={suiviAgenda.nb_ech}
          type="number"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant1ere">Montant 1ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech1", e.target.value)
          }
          value={suiviAgenda.mntech1}
          id="Montant1ere"
          type="text"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant2ere">Montant 2ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech2", e.target.value)
          }
          value={suiviAgenda.mntech2}
          id="Montant2ere"
          type="text"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5"></div>
      <div className="grid w-full max-w-sm items-center gap-1.5"></div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date1éreEcheance">Date 1ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_prem_ver || ""}
          champ={"date_prem_ver"}
          setDate={handleIputChangeSuiviAgenda}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date2éreEcheance">Date 2ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_deuxi_ech || ""}
          champ={"date_deuxi_ech"}
          setDate={handleIputChangeSuiviAgenda}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant3ere">Montant 3ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech3", e.target.value)
          }
          value={suiviAgenda.mntech3}
          id="Montant3ere"
          type="text"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant4ere">Montant 4ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech4", e.target.value)
          }
          value={suiviAgenda.mntech4}
          id="Montant4ere"
          type="text"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Montant5ere">Montant 5ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech5", e.target.value)
          }
          value={suiviAgenda.mntech5}
          id="Montant5ere"
          type="text"
        />
      </div>
      <div className="grid   items-center gap-1.5 col-span-2">
        <Label htmlFor="Lieu">Lieu</Label>
        <div className="flex">
          <Button
            className="w- px-2"
            onClick={() => {
              onOpen();         
              setColumn("lieu_rec");
            }}
          >
            <ListIcon />
          </Button>
          <div className="flex w-full">
              <Input
                readOnly
                id="Client"
                className="w-1/4 px-2 mr-1"
                value={suiviAgenda.lieu_rec}
                type="number"
              />
              <Input readOnly id="Client" className=""  type="text" />
            </div>
      </div>
        </div>
        
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date3éreEcheance">Date 3ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_trois_ech || ""}
          champ={"date_trois_ech"}
          setDate={handleIputChangeSuiviAgenda}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date4éreEcheance">Date 4ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_quat_ech || ""}
          champ={"date_quat_ech"}
          setDate={handleIputChangeSuiviAgenda}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date5éreEcheance">Date 5ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_cinq_ech || ""}
          champ={"date_cinq_ech"}
          setDate={handleIputChangeSuiviAgenda}
        />
      </div>
    </div>
  );
};

export default FaciliteDePaiementForm;
