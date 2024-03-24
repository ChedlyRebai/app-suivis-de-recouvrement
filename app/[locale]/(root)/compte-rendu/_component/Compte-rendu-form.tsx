"use client";
import React from "react";
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


import { APP_GEN } from "@/constants";
import CompteRenduHistorique from "./CompteRenduHistorique";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PromiseDereglement from "@/components/forms/Compte-rendu-form/PromiseDereglement";
import NouvelleCoordonneeForm from "@/components/forms/Compte-rendu-form/NouvelleCoordonnéeForm";
import ClientINjoignable from "@/components/forms/Compte-rendu-form/ClientINjoignable";
import FaciliteDePaiementForm from "@/components/forms/Compte-rendu-form/FaciliteDePaiementForm";
import NonreconnaissancedelaCreanceForm from "@/components/forms/Compte-rendu-form/Non-reconnaissance-de-la-créance";
import VisiteForm from "@/components/forms/Compte-rendu-form/visiteForm";
import { Textarea } from "@/components/ui/textarea";






const CompteRenduForm = () => {
  return (
    <div className=" mx-auto px-4 sm:px-6 md:px-8">
      <div className="">
        <div className="my-2 grid grid-flow-col grid-cols-4 grid-rows-5 gap-3 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Client">Client</Label>
            <div className="flex ">
              <Input id="Client" className="w-1/3 px-1 mr-1" type="number" />
              <Input id="Client" className="w-2/3" type="text" />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Groupe">Groupe</Label>
            <div className="flex ">
              <Input id="Client" className="w-1/3 px-2 mr-1" type="number" />
              <Input id="Client" className="w-2/3" type="text" />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Agence">Agence</Label>
            <div className="flex ">
              <Input id="Client" className="w-1/3 px-2 mr-1" type="number" />
              <Input id="Client" className="w-2/3" type="text" />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Segement">Segement</Label>
            <div className="flex ">
              <Input id="Client" className="w-1/3 px-2 mr-1" type="number" />
              <Input id="Client" className="w-2/3" type="text" />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Marche">Marche</Label>
            <div className="flex ">
              <Input id="Client" className="w-1/3 px-2 mr-1" type="number" />
              <Input id="Client" className="w-2/3" type="text" />
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Mnt_Imp">Mnt Imp</Label>
            <Input id="Mnt_Imp" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Solde_debiteur">Solde debiteur</Label>
            <Input id="Solde_debiteur" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Tot_irregulier">Tot_irregulier</Label>
            <Input id="Tot_irregulier" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Engagement">Engagement</Label>
            <Input id="Engagement" type="text" />
          </div>
          <div className="grid w-full max-w-s items-center col-span-2 gap-1.5">
            <Label htmlFor="Telephone">Telephone</Label>
            <Input id="Telephone" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Nbj.IMP">Nbj.IMP</Label>
            <Input id="Nbj.IMP" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Depassement">Depassement</Label>
            <Input id="Depassement" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="MaxNbj">MaxNbj</Label>
            <Input id="MaxNbj" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="ClasseRisque">Classe Risque</Label>
            <Input id="ClasseRisque" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="NombreImpaye">Nombre Impaye</Label>
            <Input id="NombreImpaye" type="text" />
          </div>
          <div className="grid  max-w-sm items-center gap-1.5">
            <Label htmlFor="Nbj.SDB">Nbj.SDB</Label>
            <Input size={4} id="Nbj.SDB" type="text" />
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
            <TableRow>
              <TableHead className="w-[100px]">Agence</TableHead>
              <TableCell>Ncp</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell className="text-right">Montant Impaye</TableCell>
              <TableCell className="text-right">Nbj Imp</TableCell>
              <TableCell className="text-right">Solde debiteur</TableCell>
              <TableCell className="text-right">Depassement</TableCell>
              <TableCell className="text-right">Nbj.SDB</TableCell>
              <TableCell className="text-right">Tot.Irregulier</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Card className="my-2">
          <CardContent className="space-y-2 ">
            <div className="grid grid-cols-3 gap-4 my-2">
              <div className="flex flex-col mr-4">
                <Label className="mb-1 text-sm font-medium" htmlFor="amount">
                  Motif de l'impaye
                </Label>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Salaire suspendu</SelectItem>
                      <SelectItem value="banana">Salaire dégradé</SelectItem>
                      <SelectItem value="blueberry">
                        Salaire suspendu puis repris
                      </SelectItem>
                      <SelectItem value="grapes">
                        Baisse de mouvement
                      </SelectItem>
                      <SelectItem value="pineapple">
                        Débit non autorisé
                      </SelectItem>
                      <SelectItem value="pineapple">autre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-1 text-sm font-medium " htmlFor="location">
                  Contact le client avec
                </Label>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Appel télephonique</SelectItem>
                      <SelectItem value="banana">Visite du client </SelectItem>
                      <SelectItem value="blueberry">Lettre</SelectItem>
                      <SelectItem value="grapes">Sommation</SelectItem>
                      <SelectItem value="pineapple">
                        Débit non autorisé
                      </SelectItem>
                      <SelectItem value="pineapple">autre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-1 text-sm font-medium " htmlFor="location">
                  Info Motif
                </Label>
                <Input className="border p-2" id="amount" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="my-2 flex items-center ">
          <RadioGroup
            onChange={(e: any) => console.log(e)}
            defaultValue="option-one"
          >
            <CardContent className="space-y-2 items-center flex w-full py-2">
              <div className="max-w-7xl w-full mx-auto py-2 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center gap-1">
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="1"
                      className="mr-2"
                      id="checkbox-1"
                    />
                    <Label>Promesse de règlement</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="3"
                      className="mr-2"
                      id="checkbox-2"
                    />
                    <Label>Nouvelles coordonnées</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="4"
                      className="mr-2"
                      id="checkbox-3"
                    />
                    <Label>Facilité de paiement</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="5"
                      className="mr-2"
                      id="checkbox-4"
                    />
                    <Label>Non reconnaissance de la créance</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="6"
                      className="mr-2"
                      id="checkbox-5"
                    />
                    <Label>Visite</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="7"
                      className="mr-2"
                      id="checkbox-6"
                    />
                    <Label>Client injoignable</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </RadioGroup>
        </Card>

        <div className=" py-2 shadow-md mt-1 bg-white dark:bg-inherit ">
          <Tabs defaultValue="Promesse de règlement">
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
              <Card className="my-2">
                <CardContent className="space-y-2 ">
                  <ClientINjoignable />
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
                <Select>
                  <SelectTrigger className="w-[280px] ">
                    <SelectValue placeholder="Appreciation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel></SelectLabel> */}
                      {APP_GEN.map((item) => (
                        <SelectItem value={`${item.Code}`}>
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
                <Textarea className="border p-2" id="location" />
              </div>
            </div>
          </CardContent>
        </Card>
        <CompteRenduHistorique/>
      </div>
    </div>
  );
};

export default CompteRenduForm;
