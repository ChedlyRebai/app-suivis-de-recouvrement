import { File } from "@/Models/file.model";
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
import { Download, ListPlusIcon } from "lucide-react";
import Link from "next/link";

import React from "react";
import OpenModelButton from "./openModelButton";

const Documents = ({ file }: { file: File[] }) => {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
        <CardTitle>Documents</CardTitle>
        
        <CardDescription>Documents de ce clients</CardDescription>

        </div>
        
        <OpenModelButton/>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead >
                Matricule de l'utilisateur
              </TableHead>
              <TableHead >
                Nom de l'utilisateur
              </TableHead>
              <TableHead >
                Nom de documents
              </TableHead>
              <TableHead >Agence/Zone</TableHead>
              <TableHead >Date</TableHead>
              <TableHead >Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {file.map((file: File, index) => {
              return (
                <TableRow className="bg-accen">
                  <TableCell className="p-2">{file.Utilisateur.usr_matricule}</TableCell>
                  <TableCell className="p-3">{file.Utilisateur.usr_nomprenom}</TableCell>
                  <TableCell className="p-3">{file.FileName}</TableCell>
                  <TableCell className="p-3">
                    {file.Utilisateur.AffecterA?.[0]?.Agence?.libelle} 
                    {file.Utilisateur.AffecterA?.[0]?.Zone?.libelle}
                  </TableCell>
                  <TableCell className="p-3">
                    {file.created_at.toString().substring(0, 10)}
                  </TableCell>
                  <TableCell className="p-3">
                    <Link   download  href={file.FilePath}>
                      <Download className="text-center" />
                    </Link>
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

export default Documents;
