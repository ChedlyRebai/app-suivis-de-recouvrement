import { Agence } from "@/Models/agence.model";

export interface CompteRenduList {
    
    usr_matricule: string;
    created_at:                                                  Date;
    id:                                                          number;
    cli:                                                         string;
    compte_rendu:                                                string;
    usr_nom:                                                     string;
    ab_client:                                                   AbClient;
    compterendutype_compterendutype_compterenduidTosuivi_agenda: CompterendutypeCompterendutypeCompterenduidTosuiviAgendum[];
}

export interface AbClient {
    id:        number;
    nom:       string;
    cli:      string;
}
export interface CompterendutypeCompterendutypeCompterenduidTosuiviAgendum {
    typeID:                number;
    types:                 Types;
    clientInjoignable:     null;
    promesseregresse:      promesseregresse;
    ClientInjoignableId:   null;
    promesseregresseID:    null;
    visite:                Visite;
    visiteId:              null;
    nouvellecoordonnees:   Nouvellecoordonnees;
    nouvellecoordonneesID: number;
    facilitePaimentId:     null;
    FacilitePaiment:       FacilitePaiment;
    nonReconnaissanceID:   null;
    nonreconaissance:      Nonreconaissance;
}

export interface promesseregresse{
    date_ver: string;
lieu_ver:string; 
mnt_reg:string; 

}
export interface Visite {
    date_visite:               null;
    h_rdv_visite_h_rdvToh_rdv: Agence;
    Agence:                    Agence;
    lieu_visite:               number;
    h_rdv:                     number;
}
export interface FacilitePaiment {
    nb_ech:   null;
    mnt_rec:  string;
    montantFacilites: MontantFacilite[];
}

export interface MontantFacilite {
    mntech:   string;
    date_ech: null;
}


export interface Nonreconaissance {
    observation: string;
}
export interface Nouvellecoordonnees {
    nouv_te2:     string;
    nouv_tel:     string;
    nouv_adresse: string;
}


export interface Types {
    code:    number;
    libelle: string;
}