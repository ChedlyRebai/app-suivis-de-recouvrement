import { File } from "@/Models/file.model";
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
              <TableHead>Action</TableHead>
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

                  <TableCell className="text-right flex">
                    {/*  */}
                    {file?.FilePath ? (
                      <Link download href={file?.FilePath}>
                        <Button className="ml-1" variant="default">
                          <EyeIcon size={16} />
                        </Button>
                      </Link>
                    ) : (
                      <Button className="ml-1" variant="default" disabled>
                        <EyeIcon size={16} />
                      </Button>
                    )}
                    <Button className="ml-1" variant="destructive">
                      <Trash2 size={16} />
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

export default UserDocuments;
