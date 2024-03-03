import { utilisateur } from "./utilisateur.model";

export type fonction = {
  code_fonction: number;
  lib_fonction: String;
  code_aff?: String;
  utilisateur?: utilisateur[];
};
