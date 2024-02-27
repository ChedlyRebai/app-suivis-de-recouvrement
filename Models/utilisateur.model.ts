import { fontion } from "./fonction.model";

export type utilisateur = {
  usr_matricule: String;
  usr_nomprenom: String;
  usr_motdepasse: String;
  code_fonction: number;
  affectation: String;
  flgstatut: String;
  tel_chargee: String;
  email_chargee: String;
  affectation_c: String;
  affectation_d: String;
  affectation_sog: String;
  fonction: fontion;
};
