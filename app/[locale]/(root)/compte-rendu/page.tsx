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

const page = () => {
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
      <div className=" grid grid-flow-col grid-cols-4 grid-rows-5 gap-3 ">
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

      <Table>
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
      </div>
       </div>
     </div>
   </div>
  );
};

export default page;
