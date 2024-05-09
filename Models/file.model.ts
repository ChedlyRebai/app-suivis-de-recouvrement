import { AbClient } from "@/actions/admin.action";
import { Agence } from "./agence.model";
import { Zone } from "./zone.model";


export interface File {
    id:         number;
    FileName:    string;
    FilePath:    string;
    created_at:  Date;
    Utilisateur: Utilisateur;
    ab_client:   AbClient;
  }
  
  export interface Utilisateur {
    usr_nomprenom: string;
    usr_matricule: string;
    AffecterA:     AffecterA[];
  }
  
  export interface AffecterA {
    Zone:   Zone;
    Agence: Agence;
  }