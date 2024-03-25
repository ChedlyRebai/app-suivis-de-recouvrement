"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
 

  {
    Nom: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
import React from "react";

const CompteRenduHistorique = () => {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead>Date Compte Rendu</TableHead>
          <TableHead colSpan={6} className="text-Right">Compte Rendu</TableHead>
          <TableHead className="">Utilisateur</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.Nom}>
            <TableCell className="font-medium">{invoice.Nom}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell colSpan={6}>{invoice.paymentMethod}</TableCell>
            <TableCell className="">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default CompteRenduHistorique;
