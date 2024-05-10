"use client";
import { SuiviAgendum } from "@/actions/utilisateur.action";
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

const UserCompteRendu = ({
  compterendus,
}: {
  compterendus: SuiviAgendum[];
}) => {
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
              <TableHead>Cli client</TableHead>
              <TableHead>Nom client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Agence</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compterendus.map((compterendu: SuiviAgendum, index: number) => {
              return (
                <TableRow key={index} className="bg-accent">
                  <TableCell className="p-3">
                    {compterendu.ab_client.cli}
                  </TableCell>
                  <TableCell className="p-3">
                    {compterendu.ab_client.nom}
                  </TableCell>
                  {/* <TableCell className="p-3">
                    <Badge className="text-xs" variant="secondary"></Badge>
                  </TableCell> */}
                  <TableCell className="p-3">
                    {
                      compterendu
                        .compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0]
                        ?.types.libelle
                    }
                  </TableCell>

                  <TableCell className="p-3">
                    {compterendu.ab_client.Agence?.libelle}
                  </TableCell>
                  <TableCell className="p-3">
                    {compterendu.ab_client.Zone?.libelle}
                  </TableCell>
                  <TableCell className="p-3">
                    {compterendu.created_at.toString().substring(0, 10)}
                  </TableCell>
                  <TableCell className="p-3">
                    <Button
                      className="flex items-center h-full  justify-center"
                      variant="default"
                      onClick={() => onOpen(compterendu.id)}
                    >
                      <SearchIcon className="mr-" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserCompteRendu;
