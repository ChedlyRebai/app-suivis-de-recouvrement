import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import React from "react";

const Comptes = ({ comptes=[] }: { comptes: any[] }) => {
  
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Comptes</CardTitle>
        <CardDescription>Comptes de ce client</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Compte</TableHead>
              <TableHead className="hidden sm:table-cell">
                Montant impaye
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                Solde debiteur
              </TableHead>
              <TableHead className="hidden md:table-cell">Agence</TableHead>
              <TableHead className="text-right">Zone</TableHead>
              <TableHead className="hidden md:table-cell">
                Depassement
              </TableHead>
              <TableHead className="text-right">Totale Engagement</TableHead>
              <TableHead className="text-right">TMontant autorise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              comptes.map((compte: any, index: number) => {
                return (
                  <TableRow key={index} className="bg-accent">
                    <TableCell>{compte.ncp}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {compte.mnt_imp}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {compte.mnt_sdb}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {compte.Agence.codug}:{compte.Agence.libelle}
                    </TableCell>
                    <TableCell className="text-right">{compte.Zone.codug}:{compte.Zone.libelle}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {compte.depassement}
                    </TableCell>
                    <TableCell className="text-right">{compte.tot_eng}</TableCell>
                    <TableCell className="text-right">
                      {compte.montant_aut}
                    </TableCell>
                  </TableRow>
                );
              })
            }
            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Comptes;
