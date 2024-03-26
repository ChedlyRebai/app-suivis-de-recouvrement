"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { format } from "date-fns";

import { APP_GEN, LISTE_CHOIX, MOTIF_IM, Sort } from "@/constants";
import CompteRenduHistorique from "./CompteRenduHistorique";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PromiseDereglement from "@/components/forms/Compte-rendu-form/PromiseDereglement";
import NouvelleCoordonneeForm from "@/components/forms/Compte-rendu-form/NouvelleCoordonnéeForm";
import ClientINjoignable from "@/components/forms/Compte-rendu-form/ClientINjoignable";
import FaciliteDePaiementForm from "@/components/forms/Compte-rendu-form/FaciliteDePaiementForm";
import NonreconnaissancedelaCreanceForm from "@/components/forms/Compte-rendu-form/Non-reconnaissance-de-la-créance";
import VisiteForm from "@/components/forms/Compte-rendu-form/visiteForm";
import { Textarea } from "@/components/ui/textarea";
import useClientSore from "@/hooks/useCompteRenduForm";
import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { AbCompte } from "@/Models/AbCompte.model";


interface CompteRenduFormProps {
  suiviAgenda: SuiviAgenda;
  listcompte: AbCompte[];
  historiqueCompteRendu: SuiviAgenda[];

}

const CompteRenduForm = (
  { suiviAgenda:suiviagendaprops,listcompte ,historiqueCompteRendu}: CompteRenduFormProps,
) => {

  const [selectedValue, setSelectedValue] = useState("1");

  const { client, handleIputChangeSuiviAgenda, suiviAgenda,setClient } = useClientSore();
  useEffect(() => {
    setClient(suiviagendaprops)
    console.log(suiviAgenda)
    console.log(listcompte)
  }, [setClient,suiviagendaprops,listcompte])
  
  const [selectedRadio, setSelectedRadio] = useState("default"); // State to manage the selected radio value

  const handleRadioChange = (e: any) => {
    setSelectedRadio(e.target.value);
  };

  const getDefaultTab = () => {
    if (selectedRadio === "2") {
      return "Nouvelles coordonnées"; // Ensure consistent spelling with the TabsTrigger values
    } else if (selectedRadio === "1") {
      return "Promesse de règlement";
    } else {
      return "Facilité de paiement";
    }
  };

  return (
    <div className=" mx-auto px-4 sm:px-6 md:px-8">
      <div className="">
        <div className="my-2 grid grid-flow-col grid-cols-4 grid-rows-5 gap-3 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Client">Client</Label>
            <div className="flex ">
              <Input
                readOnly
                value={suiviAgenda.cli}
                id="cli"
                className="w-1/3 px-1 mr-1"
                type="number"
              />
              <Input
                readOnly
                value={client.nom}
                id="nom"
                className="w-2/3"
                type="text"
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="groupe">Groupe</Label>
            <div className="flex ">
              <Input
                readOnly
                value={client.groupe}
                id="groupe"
                className="w-1/3 px-2 mr-1"
                type="number"
              />
              <Input
                readOnly
                value={client.nom_groupe}
                id="nom_groupe"
                className="w-2/3"
                type="text"
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Agence">Agence</Label>
            <div className="flex ">
              <Input
                readOnly
                value={client.agence}
                id="agence"
                className="w-1/3 px-2 mr-1"
                type="number"
              />
              <Input
                readOnly
                value={client.nom_agence}
                id="nom_agence"
                className="w-2/3"
                type="text"
              />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Segement">Segement</Label>
            <div className="flex ">
              <Input
                readOnly
                value={client.seg}
                id="Client"
                className="w-1/3 px-2 mr-1"
                type="number"
              />
              <Input readOnly id="Client" className="w-2/3" type="text" />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Marche">Marche</Label>
            <div className="flex ">
              <Input
                readOnly
                id="Client"
                className="w-1/3 px-2 mr-1"
                type="number"
              />
              <Input readOnly id="Client" className="w-2/3" type="text" />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Mnt_Imp">Mnt Imp</Label>
            <Input readOnly value={client.mnt_imp} id="Mnt_Imp" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Solde_debiteur">Solde debiteur</Label>
            <Input readOnly value={client.sd} id="Solde_debiteur" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Tot_irregulier">Tot_irregulier</Label>
            <Input
              readOnly
              value={client.tot_creance}
              id="Tot_irregulier"
              type="text"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Engagement">Engagement</Label>
            <Input
              readOnly
              value={client.engagement}
              id="Engagement"
              type="text"
            />
          </div>
          <div className="grid w-full max-w-s items-center col-span-2 gap-1.5">
            <Label htmlFor="Telephone">Telephone</Label>
            <Input readOnly value={client.tel} id="Telephone" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Nbj.IMP">Nbj.IMP</Label>
            <Input
              readOnly
              value={client.nombre_jours}
              id="Nbj.IMP"
              type="text"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Depassement">Depassement</Label>
            <Input
              readOnly
              value={client.depassement}
              id="depassement"
              type="text"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="MaxNbj">MaxNbj</Label>
            <Input readOnly value={client.max_nbj} id="MaxNbj" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="ClasseRisque">Classe Risque</Label>
            <Input
              readOnly
              value={client.classe}
              id="ClasseRisque"
              type="text"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="NombreImpaye">Nombre Impaye</Label>
            <Input
              readOnly
              value={client.nbre_imp}
              id="NombreImpaye"
              type="text"
            />
          </div>
          <div className="grid  max-w-sm items-center gap-1.5">
            <Label htmlFor="Nbj.SDB">Nbj.SDB</Label>
            <Input
              readOnly
              value={client.nombre_jours_sdb}
              size={4}
              id="Nbj.SDB"
              type="text"
            />
          </div>
        </div>

        <Table className="my-3">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Agence</TableHead>
              <TableHead>Ncp</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead className="text-right">Montant Impaye</TableHead>
              <TableHead className="text-right">Nbj Imp</TableHead>
              <TableHead className="text-right">Solde debiteur</TableHead>
              <TableHead className="text-right">Depassement</TableHead>
              <TableHead className="text-right">Nbj.SDB</TableHead>
              <TableHead className="text-right">Tot.Irregulier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listcompte && listcompte.map((item) => (
              <TableRow key={item.ncp}>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.ncp}</TableCell>
                <TableCell>{item.nom}</TableCell>
                <TableCell className="text-right">{item.mnt_imp}</TableCell>
                <TableCell className="text-right">{item.nombre_jours}</TableCell>
                <TableCell className="text-right">{item.mnt_sdb}</TableCell>
                <TableCell className="text-right">{item.depassement}</TableCell>
                <TableCell className="text-right">{item.nombre_jours_sdb}</TableCell>
                <TableCell className="text-right">{item.tot_creance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Card className="my-2 backdrop-blur-xl">
          <CardContent className="space-y-2 ">
            <div className="grid grid-cols-3 gap-4 my-2">
              <div className="flex flex-col mr-4">
                <Label className="mb-1 text-sm font-medium" htmlFor="amount">
                  Motif de l'impaye
                </Label>
                <Select
                  defaultValue={suiviAgenda.motif_imp}
                  onValueChange={(e: string) => {
                    handleIputChangeSuiviAgenda("motif_imp", e);
                    console.log(suiviAgenda);
                  }}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent
                    onChange={(e) => {
                      console.log(e);
                    }}
                  >
                    <SelectGroup
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <SelectLabel>Fruits</SelectLabel>
                      {MOTIF_IM.map((item) => (
                        <SelectItem key={item.Code} value={`${item.Code}`}>
                          {item.libelle}
                        </SelectItem>
                      ))}
                      <SelectItem value="pineapple">autre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-1 text-sm font-medium " htmlFor="location">
                  Contact le client avec
                </Label>
                <Select
                  defaultValue={suiviAgenda.liste_choix}
                  onValueChange={(e: string) => {
                    handleIputChangeSuiviAgenda("liste_choix", e);
                    console.log(suiviAgenda);
                  }}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      {LISTE_CHOIX.map((item) => (
                        <SelectItem key={item.Code} value={`${item.Code}`}>
                          {item.libelle}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-1 text-sm font-medium " htmlFor="location">
                  Info Motif
                </Label>
                <Input
                  className="border p-2"
                  onChange={(e) =>
                    handleIputChangeSuiviAgenda("info_motif", e.target.value)
                  }
                  id="amount"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="my-2 flex items-center ">
          <RadioGroup
            name="value"
            onChange={(e: any) => {
              handleRadioChange(e);
              console.log("selected radio:", typeof selectedRadio);
              console.log(e.target.value);
              console.log("change");
            }}
          >
            <CardContent className="space-y-2 items-center flex w-full py-2">
              <div className="max-w-7x w-full mx-auto py-2 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center gap-1">
                  {Sort.map((item) => (
                    <div className="flex items-center" key={item.Code}>
                      <Input key={item.Code}
                        type="radio"
                        value={`${item.Code}`}
                        name="sort"
                        className="h-4 mr-"
                      />
                      <Label>{item.libelle}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </RadioGroup>
        </Card>

        <div className=" py-2  mt-1  dark:bg-inherit ">
          <Tabs defaultValue={getDefaultTab()}>
            <TabsList>
              <TabsTrigger value="Promesse de règlement">
                Promesse de règlement
              </TabsTrigger>
              <TabsTrigger value="Nouvelles coordonnées">
                Nouvelles coordonnées
              </TabsTrigger>
              <TabsTrigger value="Facilité de paiement">
                Facilité de paiement
              </TabsTrigger>
              <TabsTrigger value="Non reconnaissance de la créance">
                Non reconnaissance de la créance
              </TabsTrigger>
              <TabsTrigger value="Visite">Visite</TabsTrigger>
              <TabsTrigger value="Client injoignable">
                Client injoignable
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Promesse de règlement">
              <Card className="my-2">
                <CardContent className="space-y-2 ">
                  <PromiseDereglement />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Nouvelles coordonnées">
              <Card className="my-2">
                <CardContent className="space-y-2 ">
                  <NouvelleCoordonneeForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Client injoignable">
              <Card className="my-2 w-full h-full flex justify-center items-center">
                <CardContent className="space-y- ">
                  Client injoignable
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Facilité de paiement">
              <Card className="my-2">
                <CardContent className="space-y-2 ">
                  <FaciliteDePaiementForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Non reconnaissance de la créance">
              <Card className="my-2">
                <CardContent className="space-y-2 ">
                  <NonreconnaissancedelaCreanceForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Visite">
              <Card className="my-2">
                <CardContent className="space-y-2 ">
                  <VisiteForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Card>
          <CardContent className="space-y-2 ">
            <div className="flex flex-col my-2">
              <div className="flex w-[280px] flex-col mr-4">
                <Label className="mb-1 text-sm font-medium " htmlFor="amount">
                  Appreciation generale
                </Label>
                <Select
                  defaultValue={suiviAgenda.app_gen}
                  onValueChange={(e: string) => {
                    handleIputChangeSuiviAgenda("app_gen", e);
                    console.log(suiviAgenda);
                  }}
                >
                  <SelectTrigger className="w-[280px] ">
                    <SelectValue placeholder="Appreciation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel></SelectLabel> */}
                      {APP_GEN.map((item) => (
                        <SelectItem key={item.Code} value={`${item.Code}`}>
                          {item.libelle}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-1 text-sm font-medium " htmlFor="location">
                  compte rendu
                </Label>
                <Textarea
                  className="border p-2"
                  onChange={(e) =>
                    handleIputChangeSuiviAgenda("compte_rendu", e.target.value)
                  }
                  value={suiviAgenda.compte_rendu}
                  id="location"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <CompteRenduHistorique listHistorique={historiqueCompteRendu} />
      </div>
    </div>
  );
};

export default CompteRenduForm;
