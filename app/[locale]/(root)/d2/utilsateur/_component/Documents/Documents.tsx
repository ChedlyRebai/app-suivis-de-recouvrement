import { File } from "@/Models/file.model";
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

const UserDocuments = ({ file }: { file: File[] }) => {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Documents</CardTitle>

          <CardDescription>Documents de ce clients</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cli</TableHead>
              <TableHead>Nom client</TableHead>

              <TableHead>Nom de documents</TableHead>
              <TableHead>Agence de client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {file.map((file: File, index) => {
              return (
                <TableRow className="bg-accen">
                  <TableCell className="p-2">{file?.ab_client?.cli}</TableCell>
                  <TableCell className="p-3">{file?.ab_client.nom}</TableCell>
                  <TableCell className="p-3">{file?.FileName}</TableCell>
                  <TableCell className="p-3">
                    {file?.ab_client?.Agence.codug} :{" "}
                    {file?.ab_client?.Agence.libelle}
                  </TableCell>
                  <TableCell className="p-3">
                    {file?.created_at?.toString()?.substring(0, 10)}
                  </TableCell>
                  <TableCell className="p-3">
                    <Link download href={file?.FilePath}>
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

export default UserDocuments;
