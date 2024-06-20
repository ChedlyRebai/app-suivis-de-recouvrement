"use client";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useListAgences from "@/hooks/use-agences-list";
import useClientSore from "@/hooks/useCompteRenduForm";
import useListeAgencestModal from "@/hooks/useListeAgences";
import { ListIcon } from "lucide-react";
import React from "react";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FaciliteDePaiementForm = () => {
  const { onOpen, setColumn } = useListeAgencestModal();
  const { client, handleIputChangeSuiviAgenda, suiviAgenda } = useClientSore();
  const getAgence = useListAgences((state) => state.getAgence);

  const [montantFacilites, setFa] = useState<{ [key: string]: string }[]>([
    {
      mntech: "",
      date_ech: "",
    },
  ]);

  // Function to handle changes in input fields
  const handleInputChange = (index: number, field: string, value: string) => {
    // const updatedFa = [...montantFacilites];
    // updatedFa[index][field] = value;
    // setFa(updatedFa);
    // console.log(montantFacilites);
    if (montantFacilites.length < suiviAgenda.nb_ech!!) {
      setFa([...montantFacilites, { [field]: value }]);
    } else {
      const updatedFa = montantFacilites.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      setFa(updatedFa);
    }
    suiviAgenda.montantFacilites = montantFacilites;
    console.log(suiviAgenda.montantFacilites);
  };
  const currentDate = new Date();
  return (
    <div className="-auto my p-2  rounded-lg shadow-md">
      <div className="flex flex-col   w-[280px] ">
        <div className="flex w-[280px] flex-col my-1 mr-4">
          <Label className="mb-1 text-sm font-medium" htmlFor="MontantImpaye">
            Montant Impaye
          </Label>
          <Input
            onChange={(e) =>
              handleIputChangeSuiviAgenda("mnt_plan", e.target.value)
            }
            id="MontantImpaye"
            type="number"
          />
        </div>
        <div className="flex w-[280px] flex-col my-3 mr-4">
          <Label className="mb-1 text-sm font-medium" htmlFor="Nombreech">
            Nombre echeance
          </Label>
          <Input
            onChange={(e) => {
              console.log(suiviAgenda);
              handleIputChangeSuiviAgenda("nb_ech", e.target.value);
            }}
            id="Nombreech"
            min={0}
            value={suiviAgenda.nb_ech || 0}
            type="number"
          />
        </div>

        {[...Array(Number(suiviAgenda.nb_ech || 0))].map((_, i) => (
          <>
            <div className="flex w-[280px] flex-col my-3 mr-4" key={i}>
              <Label
                htmlFor={`Montant${i + 1}ere`}
                className="mb-1 text-sm font-medium"
              >
                Montant {i + 1}ére éch
              </Label>
              <Input
                onChange={(e) => handleInputChange(i, "mntech", e.target.value)}
                id={`Montant${i + 1}ere`}
                type="number"
                disabled={suiviAgenda.nb_ech!! < i + 1}
              />
            </div>
            <div className="flex w-[280px] flex-col my-3 mr-4">
              <Label
                className={`${
                  suiviAgenda.nb_ech!! < 3 && "text-muted-foreground"
                }`}
              >
                Date {i + 1}ére Echeance
              </Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    // className={cn(
                    //   "w-[280px] justify-start  text-left font-normal",
                    //   !date && `text-muted-foreground cursor-not-allowe ${disable && "cursor-not-allowed"} `,
                    // )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 w" />

                    {montantFacilites[i]?.date_ech ? (
                      format(montantFacilites[i]?.date_ech, "PPP")
                    ) : (
                      <span>Choisis une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    fromDate={currentDate}
                    mode="single"
                    // onSelect={(e: any) =>
                    //   handleInputChange(i, "date_ech", e.target.value)
                    // }
                    onSelect={(selectedDate: any) => {
                      console.log(selectedDate);
                      handleInputChange(i, "date_ech", selectedDate);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </>
        ))}

        {/*       
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="Montant1ere" className={`${suiviAgenda.nb_ech!! < 1 && "text-muted-foreground"}`}>Montant 1ére éch</Label>
          <Input
            onChange={(e) =>
              handleIputChangeSuiviAgenda("mntech1", e.target.value)
            }
            value={suiviAgenda.mntech1}
            id="Montant1ere"
            type="number"
            disabled={suiviAgenda.nb_ech!! < 1}
          />
        </div>
          
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Montant2ere" className={`${suiviAgenda.nb_ech!! < 2 && "text-muted-foreground"}`}>Montant 2ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech2", e.target.value)
          }
          value={suiviAgenda.mntech2}
          id="Montant2ere"
          type="number"
          disabled={suiviAgenda.nb_ech!! < 2}
        />
      </div> */}
        <div className="grid w-full max-w-sm items-center gap-1.5"></div>
        <div className="grid w-full max-w-sm items-center gap-1.5"></div>
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Montant1ere" className={`${suiviAgenda.nb_ech!! < 1 && "text-muted-foreground"}`}>Date 1ére éch</Label>
        <DatePickerDemo
          date={suiviAgenda.date_prem_ver || ""}
          champ={"date_prem_ver"}
          setDate={handleIputChangeSuiviAgenda}
          disabled={suiviAgenda.nb_ech!! < 1}
        />
      </div> */}
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Date2éreEcheance" className={`${suiviAgenda.nb_ech!! < 2 && "text-muted-foreground"}`}>Date 2ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_deuxi_ech || ""}
          champ={"date_deuxi_ech"}
          setDate={handleIputChangeSuiviAgenda}
          disabled={suiviAgenda.nb_ech!! < 2}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Montant3ere" className={`${suiviAgenda.nb_ech!! < 3 && "text-muted-foreground"}`}>Montant 3ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech3", e.target.value)
          }
          value={suiviAgenda.mntech3}
          id="Montant3ere"
          type="number"
          disabled={suiviAgenda.nb_ech!! < 3}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Montant4ere" className={`${suiviAgenda.nb_ech!! < 4 && "text-muted-foreground"}`}>Montant 4ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech4", e.target.value)
          }
          value={suiviAgenda.mntech4}
          id="Montant4ere"
          type="number"
          disabled={suiviAgenda.nb_ech!! < 4}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Montant5ere" className={`${suiviAgenda.nb_ech!! < 5 && "text-muted-foreground"}`}>Montant 5ére éch</Label>
        <Input
          onChange={(e) =>
            handleIputChangeSuiviAgenda("mntech5", e.target.value)
          }
          value={suiviAgenda.mntech5}
          id="Montant5ere"
          type="number"
          disabled={suiviAgenda.nb_ech!! < 5}
        />
      </div> */}
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
                defaultValue={0}
              />
              <Input
                readOnly
                id="Client"
                className=""
                value={getAgence(suiviAgenda.lieu_rec)}
              />
            </div>
          </div>
        </div>
        {/* 
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Date3éreEcheance" className={`${suiviAgenda.nb_ech!! < 3 && "text-muted-foreground"}`}>Date 3ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_trois_ech || ""}
          champ={"date_trois_ech"}
          setDate={handleIputChangeSuiviAgenda}
          disabled={suiviAgenda.nb_ech!! < 3}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label  htmlFor="Date4éreEcheance" 
        className={`${suiviAgenda.nb_ech!! < 4 && "text-muted-foreground"}`}
        >Date 4ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_quat_ech || ""}
          champ={"date_quat_ech"}
          setDate={handleIputChangeSuiviAgenda}
          disabled={suiviAgenda.nb_ech!! < 4}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="Date5éreEcheance" className={`${suiviAgenda.nb_ech!! < 5 && "text-muted-foreground"}`}>Date 5ére Echeance</Label>
        <DatePickerDemo
          date={suiviAgenda.date_cinq_ech || ""}
          champ={"date_cinq_ech"}
          setDate={handleIputChangeSuiviAgenda}
          disabled={suiviAgenda.nb_ech!! < 5}
        />
      </div> */}
      </div>
    </div>
  );
};

export default FaciliteDePaiementForm;
