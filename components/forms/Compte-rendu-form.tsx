"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "../ui/card";
import VisiteForm from "./Compte-rendu-form/visiteForm";
import NonreconnaissancedelaCreanceForm from "./Compte-rendu-form/Non-reconnaissance-de-la-créance";
import FaciliteDePaiementForm from "./Compte-rendu-form/FaciliteDePaiementForm";
import PromiseDereglement from "./Compte-rendu-form/PromiseDereglement";
import NouvelleCoordonneeForm from "./Compte-rendu-form/NouvelleCoordonnéeForm";
import ClientINjoignable from "./Compte-rendu-form/ClientINjoignable";

const CompteRenduForm = () => {
  return (
    <div className=" mx-auto px-4 sm:px-6 md:px-8">
      <div className="">
        <div className="my-2 grid grid-flow-col grid-cols-4 grid-rows-5 gap-3 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Client">Client</Label>
            <Input id="Client" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Groupe">Groupe</Label>
            <Input id="Groupe" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Agence">Agence</Label>
            <Input id="Agence" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Segement">Segement</Label>
            <Input id="Segement" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Marche">Marche</Label>
            <Input id="Marche" type="text" />
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
        <div className=" p-4 shadow-md mt-1 bg-white dark:bg-inherit ">
          <Tabs defaultValue="Promesse de règlement" >
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
      </div>
    </div>
  );
};

export default CompteRenduForm;
