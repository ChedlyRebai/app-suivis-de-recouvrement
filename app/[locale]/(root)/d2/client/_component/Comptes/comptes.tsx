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

const Comptes = ({ comptes = [] }: { comptes: any[] }) => {
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
              <TableHead>Montant impaye</TableHead>
              <TableHead>Solde debiteur</TableHead>
              <TableHead>Agence</TableHead>
              <TableHead className="text-right">Zone</TableHead>
              <TableHead>Depassement</TableHead>
              <TableHead className="text-right">Totale Engagement</TableHead>
              <TableHead className="text-right">TMontant autorise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comptes.length > 0 &&
              comptes.map((compte: any, index: number) => {
                return (
                  <TableRow key={index} className="bg-accent">
                    <TableCell className="p-3">{compte.ncp}</TableCell>
                    <TableCell className="p-3">{compte.mnt_imp}</TableCell>
                    <TableCell className="p-3">{compte.mnt_sdb}</TableCell>
                    <TableCell className="p-3">
                      {compte.Agence.codug}:{compte.Agence.libelle}
                    </TableCell>
                    <TableCell className="text-right">
                      {compte.Zone.codug}:{compte.Zone.libelle}
                    </TableCell>
                    <TableCell className="p-3">{compte.depassement}</TableCell>
                    <TableCell className="p-3">{compte.tot_eng}</TableCell>
                    <TableCell className="p-3">{compte.montant_aut}</TableCell>
                  </TableRow>
                );
              })}
            {comptes.length === 0 && (
              <TableRow>
                <TableCell className="h-24 text-center">
                  Pas de résultats.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Comptes;
