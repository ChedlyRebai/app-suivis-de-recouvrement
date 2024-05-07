"use server"
import { Agence } from "@/Models/agence.model";
import axios from "axios";

export interface Main {
    result:     Utilisateur[];
    totalCount: number;
    totalPages: number;
}

export interface Utilisateur {
    id:            number;
    cli:           string;
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




export interface clientResult {
    result:     Client[];
    totalCount: number;
    totalPages: number;
}

export interface Client {
    id:               string;
    nom:              string;
    Agence:           Agence;
    nbre_imp:         number;
    mnt_imp:          string;
    nombre_jours:     number;
    sd:               string;
    depassement:      string;
    nombre_jours_sdb: number;
    tel1:             string;
    tel2:             null;
    Zone:             Agence;
}






export const getAllUsers = async (
    
    currentpage?: number,
    perpage?: number,   
  ) => {
    try {
   
      axios.defaults.baseURL = `${process.env.API_URL}`;
      
    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
      const res = await axios.get<Main>(
        `http://localhost:10001/users/all?perpage=5?page`
      );

        console.log(res.data);
  
      return res.data as Main || ({} as Main);
    } catch (error) {
      return {} as Main;
    }
  };
  
  

  export const getAllClient = async (
    
    currentpage?: number,
    perpage?: number,   
  ) => {
    try {
   
      axios.defaults.baseURL = `${process.env.API_URL}`;
      
    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
      const res = await axios.get<clientResult>(
        `http://localhost:10001/client/all?perpage=5?page`
      );

        console.log(res.data);
  
      return res.data as clientResult || ({} as clientResult);
    } catch (error) {
      return {} as clientResult;
    }
  };
  
export const getAllCompteRendu = async (
    
    currentpage?: number,
    perpage?: number,   
  ) => {
    try {
   
      axios.defaults.baseURL = `${process.env.API_URL}`;
      
    //   console.log(
    //     `https://sprint2-two.vercel.app/client/listclientnoncontactes?page=${currentpage}&perPage=${perpage}&search=${IdClient}&groupe=${groupe}&agence=${agence}&from=${dayfrom}&to=${dayto}`
    //   );
      const res = await axios.get<Main>(
        `http://localhost:10001/compterendu/all`
      );

        console.log(res.data);
  
      return res.data as Main || ({} as Main);
    } catch (error) {
      return {} as Main;
    }
  };

  