"use client";
import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
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

import React from "react";
interface CompteRenduHistoriqueProps {
  listHistorique: SuiviAgenda[];
}
const CompteRenduHistorique = ({
  listHistorique,
}: CompteRenduHistoriqueProps) => {
  return (
    <>
      {/* <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> 
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead>Date Compte Rendu</TableHead>
          <TableHead colSpan={6} className="text-Right">Compte Rendu</TableHead>
          <TableHead className="">Utilisateur</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listHistorique && listHistorique.map((item:SuiviAgenda) => (
          <TableRow key={item.num}>
            <TableCell className="font-medium">{item.num}</TableCell>
            <TableCell>{`${item.date_ag?.toLocaleTimeString}`}</TableCell>
            <TableCell colSpan={6}>{item.compte_rendu}</TableCell>
            <TableCell className="">{item.usr_nom}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table> 
    */}

      <div className="">
        {/* <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
          <p className="mt-2 text-sm text-gray-700">
            A table of placeholder stock market data that does not make any sense.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Export
          </button>
        </div>
      </div> */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nom
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date compte rendu
                      </th>
                      <th
                        colSpan={3}
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Compte Rendu
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Utilisateur
                      </th>

                      <th
                        scope="col"
                        className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {listHistorique.map((item,i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                          {item.num}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {item.date_ag ? item.date_ag.toString().split('T')[0] : ""}
                        </td>
                        <td
                          className="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
                          colSpan={3}
                        >
                          {item.compte_rendu}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                          {item.usr_nom}
                        </td>

                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {item.id}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompteRenduHistorique;
