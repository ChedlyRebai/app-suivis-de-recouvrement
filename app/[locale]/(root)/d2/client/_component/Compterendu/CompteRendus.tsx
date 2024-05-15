"use client";
import CompteRenduModal from "@/components/shared/Modals/Compte-Rendu-Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { CompteRenduList } from "@/constants/types";
import useCompteRenduModal from "@/hooks/use-compte-rendu-modal";
import { SearchIcon } from "lucide-react";

import React from "react";

const CompteRendu = ({ compterendus }: { compterendus: CompteRenduList[] }) => {
  const { onOpen } = useCompteRenduModal();

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Compte rendu</CardTitle>
        <CardDescription>Compte rendu de ce client.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Non utilistaeur</TableHead>
              <TableHead>utilistaeur Matricule</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compterendus.length > 0 &&
              compterendus.map(
                (compterendu: CompteRenduList, index: number) => {
                  return (
                    <TableRow key={index} className="bg-accent">
                      <TableCell>{compterendu.usr_nom}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {compterendu.usr_matricule}
                      </TableCell>
                      {/* <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary"></Badge>
                  </TableCell> */}
                      <TableCell className="hidden md:table-cell">
                        {
                          compterendu
                            .compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                            ?.types.libelle
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        {compterendu.created_at.toString().substring(0, 10)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          className="ml-1"
                          variant="default"
                          onClick={() => onOpen(compterendu.id)}
                        >
                          <SearchIcon size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            {compterendus.length === 0 && (
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

export default CompteRendu;
