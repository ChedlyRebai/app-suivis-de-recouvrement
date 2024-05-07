"use client";
import { ab_client } from "@/Models/ab_client.model";
import {
  Client,
  CompteRendu,
  Utilisateur,
  clientResult,
} from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import useCompteRenduModal from "@/hooks/use-compte-rendu-modal";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SearchIcon } from "lucide-react";

export const compterendutcolumns: ColumnDef<CompteRendu>[] = [
  {
    accessorKey: "cli",
    header: "Client Cli",
  },
  {
    accessorKey: "ab_client.nom",
    header: "Nom de client",
  },
  {
    accessorKey:"created_at",
    header:"Date de création",
    cell: ({ row }) => {
      return (
        <span>
          {`${row.original.created_at?.toString()?.substring(0, 10)}`}{" "}
        </span>
      );
    },
  },
  
  {
    accessorKey: "Type de compte rendu",
    header: "Type de compte rendu",
    cell: ({ row }) => {
      return (
        <span>
          {`${row.original?.compterendutype_compterendutype_compterenduidTosuivi_agenda?.[0].types?.libelle}`}{" "}
        </span>
      );
    },
},
    {
        id: "actions",
        enableHiding: false,
        header: ({ column }) => {
          return <div>Action</div>;
        },
        cell: ({ row }) => {
          const payment = row.original;
          const { isOpen, onClose, onOpen } = useCompteRenduModal();
  
          return (
            <Button
              className="flex items-center h-full  justify-center"
              variant="default"
              onClick={()=>onOpen(row.original.id)}
            >
              <SearchIcon  className="mr-" />
             
            </Button>
          );
        },
      },
];

// export interface CompteRendu {
//     created_at:                                                  Date;
//     id:                                                          number;
//     cli:                                                         string;
//     compte_rendu:                                                string;
//     usr_nom:                                                     string;
//     ab_client:                                                   AbClient;
//     compterendutype_compterendutype_compterenduidTosuivi_agenda: CompterendutypeCompterendutypeCompterenduidTosuiviAgendum[];
// }

// export interface AbClient {
//     nom: string;
//     cli: string;
// }

// export interface CompterendutypeCompterendutypeCompterenduidTosuiviAgendum {
//     typeID:                number;
//     types:                 Types;
//     clientInjoignable:     ClientInjoignable | null;
//     promesseregresse:      Promesseregresse | null;
//     ClientInjoignableId:   number | null;
//     promesseregresseID:    number | null;
//     visite:                Visite | null;
//     visiteId:              number | null;
//     nouvellecoordonnees:   Nouvellecoordonnees | null;
//     nouvellecoordonneesID: number | null;
//     facilitePaimentId:     null;
//     FacilitePaiment:       null;
//     nonReconnaissanceID:   number | null;
//     nonreconaissance:      Nonreconaissance | null;
// }

// export interface ClientInjoignable {
//     lieu_ver: string;
// }

// export interface Nonreconaissance {
//     observation: string;
// }

// export interface Nouvellecoordonnees {
//     nouv_te2:     string;
//     nouv_tel:     string;
//     nouv_adresse: string;
// }

// export interface Promesseregresse {
//     mnt_reg:  string;
//     lieu_ver: string;
//     date_ver: null;
// }

// export interface Types {
//     code:    number;
//     libelle: string;
// }

// export interface Visite {
//     date_visite:               null;
//     h_rdv_visite_h_rdvToh_rdv: Agence;
//     Agence:                    Agence;
//     lieu_visite:               number;
//     h_rdv:                     number;
// }
