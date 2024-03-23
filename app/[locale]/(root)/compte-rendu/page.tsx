import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
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

const page = () => {
  const date = new Date();
  return (
    <div>
      <div className="py-6">
        <div className=" mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Compte Rendu
          </h1>
        </div>
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
            <div className=" p-4 shadow-md">
              <Tabs>
                <div className="flex space-x-1">
                  <div className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-t-md">
                    Promesse de règlement
                  </div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-700 hover:bg-blue-100 rounded-t-md">
                    Nouvelles coordonnées
                  </div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-700 hover:bg-blue-100 rounded-t-md">
                    Facilité de paiement
                  </div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-700 hover:bg-blue-100 rounded-t-md">
                    Non reconnaissance de la créance
                  </div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-700 hover:bg-blue-100 rounded-t-md">
                    Visite
                  </div>
                  <div className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-blue-700 hover:bg-blue-100 rounded-t-md">
                    Client injoignable
                  </div>
                </div>
              </Tabs>
              <Separator />
              {/* <div className="">
                <div className="flex p-4">
                  <div className="flex flex-col mr-4">
                    <Label
                      className="mb-1 text-sm font-medium   "
                      htmlFor="amount"
                    >
                      Montant
                    </Label>

                    <Input
                      className="border p-2"
                      id="amount"
                      placeholder="850 672.280"
                    />
                  </div>
                  <div className="flex flex-col mr-4">
                    <Label
                      className="mb-1 text-sm font-medium   "
                      htmlFor="amount"
                    >
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col">
                    <Label
                      className="mb-1 text-sm font-medium "
                      htmlFor="location"
                    >
                      Lieu
                    </Label>
                    <Input
                      className="border p-2"
                      id="location"
                      placeholder="Lieu"
                    />
                  </div>
                </div>
              </div> */}

              {/* <div className=" mx-auto my-2 p-2  rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col mr-4">
                    <Label
                      className="mb-1 text-sm font-medium   "
                      htmlFor="amount"
                    >
                      Tel
                    </Label>

                    <Input
                      className="border p-2"
                      id="amount"
                      placeholder="850 672.280"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label
                      className="mb-1 text-sm font-medium "
                      htmlFor="location"
                    >
                      Tel2
                    </Label>
                    <Input
                      className="border p-2"
                      id="location"
                      placeholder="Lieu"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label
                    className="mb-1 text-sm font-medium "
                    htmlFor="location"
                  >
                    Lieu
                  </Label>
                  <Textarea
                    className="border p-2"
                    id="location"
                    placeholder="Lieu"
                  />
                </div>
              </div> */}



              <div className="">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
