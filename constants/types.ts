export interface CompteRenduList {
    id:                                                          number;
    cli:                                                         string;
    compte_rendu:                                                String | null;
    compterendutype_suivi_agenda_comptretypeidTocompterendutype: CompterendutypeSuiviAgendaComptretypeidTocompterendutype | null;
    compterendutype_compterendutype_compterenduidTosuivi_agenda: CompterendutypeCompterendutypeCompterenduidTosuiviAgendum[];
    usr_nom :                                                   string;
    created_at:                                                  Date;

}



export interface CompterendutypeCompterendutypeCompterenduidTosuiviAgendum {
    typeID: number;
    types:  Types;
}

export interface Types {
    code:    number;
    libelle: String;
}

// export enum Libelle {
//     NonReconnaissanceDeLaCréance = "Non reconnaissance de la créance",
//     NouvellesCoordonnées = "Nouvelles coordonnées",
//     PromesseDeRèglement = "Promesse de règlement",
//     Visite = "Visite",
// }

export interface CompterendutypeSuiviAgendaComptretypeidTocompterendutype {
    typeID:              number;
    clientInjoignable:   null;
    promesseregresseID:  null;
    visite:              null;
    FacilitePaiment:     null;
    nonreconaissance:    null;
    nouvellecoordonnees: Nouvellecoordonnees;
}

export interface Nouvellecoordonnees {
    id:            number;
    nouv_te2:      string;
    nouv_tel:      string;
    nouv_adresse:  string;
    suiviagendaid: number;
}

