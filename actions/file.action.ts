"use server";
import { Agence } from "@/Models/agence.model";
import { File } from "@/Models/file.model";
import axios from "axios";
import { Zone } from "./admin.action";
import { cookies } from "next/headers";

export interface Main {
  FileName: string;
  FilePath: string;
  created_at: Date;
  Utilisateur: Utilisateur;
}

export interface Utilisateur {
  usr_nomprenom: string;
  usr_matricule: string;
  AffecterA: AffecterA[];
}

export interface AffecterA {
  Zone: Zone;
  Agence: Agence;
}

export const creatFile = async (
  clientID: Number,
  name: string,
  path: string
): Promise<File> => {
  console.log(`http://localhost:10001/file/create`);
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.post<File>(
      `http://localhost:10001/file/create`,

      {
        clientID: clientID,
        name: name,
        path: path,
      }
    );
    return (res.data as File) || ({} as File);
  } catch (error) {
    console.log(error);
    return {} as File;
  }
};

export const getAllfilesByClientId = async (
  clientID: Number
): Promise<File[]> => {
  console.log(`http://localhost:10001/file/allbyid?id=${clientID}`);
  try {
    const res = await axios.get<Main[]>(
      `http://localhost:10001/file/allbyid?id=${clientID}`
    );

    return (res.data as File[]) || ({} as File[]);
  } catch (error) {
    console.log(error);
    return {} as File[];
  }
};

export interface fileresult {
  result: File[];
  totalCount: number;
  totalPages: number;
}
export const getAllfiles = async (
  currentpage?: number,
  perpage?: number,
  search?: string
): Promise<fileresult> => {
  try {
    const res = await axios.get<fileresult>(
      `http://localhost:10001/file/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );

    return (res.data as fileresult) || ({} as fileresult);
  } catch (error) {
    console.log(error);
    return {} as fileresult;
  }
};

export const deleteFile = async (idFile: Number | string): Promise<File> => {
  console.log(`http://localhost:10001/file/create`);
  try {
    const res = await axios.delete<File>(
      `http://localhost:10001/file/deleteById?id=${idFile}`
    );
    return (res.data as File) || ({} as File);
  } catch (error) {
    console.log(error);
    return {} as File;
  }
};
