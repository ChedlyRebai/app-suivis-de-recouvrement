"use client";
import useCompteRenduModal from "@/hooks/use-compte-rendu-modal";
import React from "react";
import Modal from "./Modal";
import { useQuery } from "@tanstack/react-query";
import { getCompteRenduById } from "@/actions/client.action";
import { Label } from "@/components/ui/label";
import { ClipboardListIcon } from "lucide-react";
import Oval from "react-loading-icons/dist/esm/components/oval";

const CompteRenduModal = () => {
  const { id, isOpen, onOpen, onClose } = useCompteRenduModal();

  const { isPending, error, data={} as any } = useQuery({
    queryKey: ["getCompteRendu", id],
    queryFn: async () => await getCompteRenduById(id),
  });

  if(error) return null;
  if(!data) return null;
  console.log(id);
  console.log(data);
  console.log(data?.compterendutype_compterendutype_compterenduidTosuivi_agenda)
  return (
    <Modal
      title={`ee`}
      description={`ee`}
      isOpen={isOpen}
      onChange={onClose}
    >
      {isPending && (
        <div className="w-full flex justify-center items-center">
          <Oval className="w-6 h-6 text-primary" />
        </div>
      )}
      {error && <div>An error has occurred: {error}</div>}
      {data && (
        <>
          <p>{data.compte_rendu}</p>
        </>
      )}
      {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
        ?.types?.code === 1 && (
        <div className="flex justify-center items-center">
          <Label className="text-primary">Promesse</Label>
        </div>
      )}

      {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
        ?.types?.code === 2 && (
        <div className="">
          <Label className="text-primary">Nouveau Telephone 1</Label>
          <p>
            {" "}
            {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                .nouvellecoordonnees?.nouv_tel
            }
          </p>{" "}
          <Label className="text-primary">Nouveau Telephone 2</Label>
          <p>
            {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                ?.nouvellecoordonnees?.nouv_te2
            }
          </p>{" "}
          <Label className="text-primary">Nouveau Addresse</Label>
          <p>
            {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                ?.nouvellecoordonnees?.nouv_adresse
            }
          </p>{" "}
        </div>
      )}

      {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
        ?.types?.code === 3 && (
        <div className="flex justify-center items-center">
          <Label className="text-primary">Montant</Label>
          <p>{
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                ?.FacilitePaiment.mnt_rec
            }</p>
          <Label className="text-primary">Nombre echeance</Label>
          <p>{
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                ?.FacilitePaiment.nb_ech
            }</p>
          {
            data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
              ?.FacilitePaiment?.montantFacilites?.map((item:any, index:number) => (
                <div key={index}>
                  <Label className="text-primary">Montant echeance</Label>
                  <p>{item.mntech}</p>
                  <Label className="text-primary">Date echeance</Label>
                  <p>{item.date_ech}</p>
                </div>
              ))
          }
        </div>
      )}

{/* export interface FacilitePaiment {
    nb_ech:   null;
    mnt_rec:  string;
    montantFacilites: MontantFacilite[];
}

export interface MontantFacilite {
    mntech:   string;
    date_ech: null;
} */}

      {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
        ?.types?.code === 4 && (
        <div className="flex justify-center items-center">
          <Label className="text-primary">Observation</Label>
          <p>
          {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                .nonreconaissance?.observation
            }
          </p>
        </div>
      )}

      {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
        ?.types?.code === 5 && (
          <div className="">
          <Label className="text-primary">Heure visite</Label>
          <p>
            {" "}
            {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                .visite?.h_rdv_visite_h_rdvToh_rdv.libelle
            }
          </p>{" "}
          <Label className="text-primary">Lieu Visite 2</Label>
          <p>
            {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                ?.visite?.Agence.libelle
            }{" "}
            {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                ?.visite?.lieu_visite
            }
          </p>{" "}
          <Label className="text-primary">Date visite</Label>
          <p>
            {
              data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
                ?.visite?.date_visite
            }
          </p>{" "}
        </div>
      )}

      {data?.compterendutype_compterendutype_compterenduidTosuivi_agenda[0]
        ?.types?.code === 6 && (
        <div className="flex justify-center items-center">
          <Label className="text-primary">Client Injoignable</Label>
        </div>
      )}

      {data?.compte_rendu === "" && (
        <div className="flex justify-center items-center">
          <Label className="text-primary">Pas de compte rendu</Label>
        </div>
      )}
    </Modal>
  );
};

export default CompteRenduModal;
