import { File } from "@/Models/file.model";
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
import { Download } from "lucide-react";
import Link from "next/link";

import React from "react";

const Documents = ({ file }: { file: File[] }) => {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Documents</CardTitle>
        <CardDescription>Documents de ce clients</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >
                Nom de documents
              </TableHead>
              <TableHead >Date</TableHead>
              <TableHead >Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {file.map((file: File, index) => {
              return (
                <TableRow className="bg-accen">
                  <TableCell>{file.FileName}</TableCell>
                  <TableCell >
                    {file.created_at.toString().substring(0, 10)}
                  </TableCell>
                  <TableCell >
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
