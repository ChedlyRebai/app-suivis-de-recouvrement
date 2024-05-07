import { Agence } from "@/Models/agence.model";
import axios from "axios";

export interface Utilisateur {
    result:     Result[];
    totalCount: number;
    totalPages: number;
}

export interface Result {
    id:            number;
    usr_matricule: string;
    usr_nomprenom: string;
    email_chargee: null;
    affectation:   number | null;
    AffecterA:     AffecterA[];
    flgstatut:     string;
    tel_chargee:   null;
}

export interface AffecterA {
    Agence?: Agence;
    Zone?:   Zone;

}

export interface Zone {
    codug:   number;
    libelle: string;
}


export const getClientNonContactes = async (
    
    currentpage?: number,
    perpage?: number,   
  ) => {
    try {
   
      axios.defaults.baseURL = `${process.env.API_URL}`;
      
    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
      const res = await axios.get<Utilisateur>(
        `http://localhost:10001/users/all?perpage=${perpage}?page=${currentpage}`
      );


  
      return res.data || ({} as Utilisateur);
    } catch (error) {
      return {} as Utilisateur;
    }
  };
  
  