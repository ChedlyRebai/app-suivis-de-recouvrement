"use client";
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
import { Download, EyeIcon, ListPlusIcon, Trash2 } from "lucide-react";
import Link from "next/link";

import React from "react";
import OpenModelButton from "./openModelButton";
import { deleteFile } from "@/actions/file.action";

const Documents = ({ file }: { file: File[] }) => {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Documents de ce clients</CardDescription>
        </div>
        <OpenModelButton />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" px-1">
                Matricule de l'utilisateur
              </TableHead>
              <TableHead className=" px-1">Nom de l'utilisateur</TableHead>
              <TableHead>Nom de documents</TableHead>
              {/* <TableHead>Agence/Zone</TableHead> */}
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {file.length > 0 &&
              file?.map((file: File, index) => {
                return (
                  <TableRow className="bg-accen">
                    <TableCell className="p-2">
                      {file?.Utilisateur?.usr_matricule}
                    </TableCell>
                    <TableCell className="p-3">
                      {file?.Utilisateur?.usr_nomprenom}
                    </TableCell>
                    <TableCell className="p-3">{file?.FileName}</TableCell>
                    {/* <TableCell className="p-3">
                      {file?.Utilisateur?.AffecterA?.[0]?.Agence?.libelle}
                      {file?.Utilisateur?.AffecterA?.[0]?.Zone?.libelle}
                    </TableCell> */}
                    <TableCell className="p-3">
                      {file?.created_at.toString().substring(0, 10)}
                    </TableCell>
                    <TableCell className="p-3 flex flex-row">
                      {/* <Link download href={file.FilePath}>
                      <Download className="text-center" />
                    </Link> */}
                      <Button
                        variant="default"
                        onClick={() => {
                          window.open(file?.FilePath);
                        }}
                      >
                        <EyeIcon size={16} />
                      </Button>{" "}
                      <Button
                        className="ml-1"
                        variant="destructive"
                        onClick={async () => {
                          await deleteFile(file?.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {file?.length === 0 && (
          <TableRow className="w-full">
            <TableCell className="h-24 text-center  text-center">
              Pas de résultats.
            </TableCell>
          </TableRow>
        )}
      </CardContent>
    </Card>
  );
};

export default Documents;
