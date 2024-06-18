"use server";
import { Agence } from "@/Models/agence.model";
import { File } from "@/Models/file.model";
import axios from "axios";
import { Zone } from "./admin.action";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

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

// export const onLoadFile = async (file: any): Promise<string> => {
//   const arrayBuffer = await file.arrayBuffer();
//   const typedarray = new Uint8Array(arrayBuffer);

//   const pdf = (await pdfjsLib.getDocument({ data: typedarray })
//     .promise) as PDFDocumentProxy;
//   const page = (await pdf.getPage(1)) as PDFPageProxy;
//   const textContent = await page.getTextContent();
//   const text = textContent.items.map((item: any) => item.str).join(" ");

//   return text;
// };

export const creatFile = async (
  clientID: Number,
  name: string,
  path: string,
  resume?: string
): Promise<File> => {
  console.log(`https://release4.vercel.app/file/create`);
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const res = await axios.post<File>(
      `https://release4.vercel.app/file/create`,
      {
        clientID: clientID,
        name: name,
        path: path,
        resume: resume,
      }
    );
    revalidatePath("/");
    revalidatePath("");
    return (res.data as File) || ({} as File);
  } catch (error) {
    console.log(error);
    return {} as File;
  }
};

export const getResumme = async (url: string) => {
  try {
    const response = await axios.post(
      `http://localhost:10004/file/upload?url=${url}`
    );
    console.log(response.data);
    return response.data.message || "";
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getAllfilesByClientId = async (
  clientID: Number
): Promise<File[]> => {
  console.log(`https://release4.vercel.app/file/allbyid?id=${clientID}`);
  try {
    const res = await axios.get<Main[]>(
      `https://release4.vercel.app/file/allbyid?id=${clientID}`
    );

    return (res.data as File[]) || ({} as File[]);
  } catch (error) {
    console.log(error);
    return {} as File[];
  }
};
export const getAllfilesByCli = async (
  cli: Number,
  currentPage: string | number,
  perPage: string | number
): Promise<fileresult> => {
  console.log(
    `https://release4.vercel.app/file/allbycli?cli=${cli}&page=${currentPage}&perpage=${perPage}`
  );
  try {
    const res = await axios.get<fileresult>(
      `https://release4.vercel.app/file/allbycli?cli=${cli}&page=${currentPage}&perpage=${perPage}`
    );
    revalidateTag("/");
    revalidatePath("/");
    revalidatePath("/file");
    return (res.data as fileresult) || ({} as fileresult);
  } catch (error) {
    console.log(error);
    return {} as fileresult;
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
      `https://release4.vercel.app/file/all?perpage=${perpage}&page=${currentpage}&search=${search}`
    );

    revalidatePath("/files");
    revalidatePath("/");
    return (res.data as fileresult) || ({} as fileresult);
  } catch (error) {
    console.log(error);
    return {} as fileresult;
  }
};

export const deleteFile = async (idFile: Number | string): Promise<File> => {
  console.log(`https://release4.vercel.app  /file/create`);
  try {
    const res = await axios.delete<File>(
      `https://release4.vercel.app/file/deleteById?id=${idFile}`
    );

    revalidatePath("/files");
    return (res.data as File) || ({} as File);
  } catch (error) {
    console.log(error);
    return {} as File;
  }
};

export const uploadfile = async (file: any): Promise<File> => {
  try {
    const res = await axios.post<File>(
      `https://release4.vercel.app/file/upload`,
      file
    );

    return (res.data as File) || ({} as File);
  } catch (error) {
    console.log(error);
    return {} as File;
  }
};
