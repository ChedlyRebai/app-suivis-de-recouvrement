"use server ";

import { Cxuntges } from "@/Models/Cxuntges.model";
import axios from "axios";

interface Main {
  code: number;
  libelle: string;
}

// export default async function extractTextFromPDF(file: File) {
//   const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
//   const pdf = await loadingTask.promise;
//   let extractedText = "";

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items.map((item: any) => item.str).join(" ");
//     extractedText += pageText + " ";
//   }

//   return extractedText.trim();
// }

// export const transdata = async (data: ArrayBuffer): Promise<any> => {
//   try {
//     const typedArray = new Uint8Array(data);

//     const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
//     console.log("PDF loaded");

//     const page = await pdf.getPage(1);
//     console.log("Page loaded");

//     const textContent = await page.getTextContent();
//     let text = "";

//     textContent.items.forEach((item: any) => {
//       text += item.str + " ";
//     });

//     // Display text content
//     console.log(text);

//     return [];
//   } catch (error) {
//     console.error(error);
//     return [] as Main[];
//   }
// };

// export const extractTextFromPDF = async (file: File): Promise<string> => {
//   const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
//   const pdf = await loadingTask.promise;
//   let extractedText = "";

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items.map((item: any) => item.str).join(" ");
//     extractedText += pageText + " ";
//   }

//   return extractedText.trim();
// };

export const getMotif = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/motifs`
    );
    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const getcontact = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/contact`
    );
    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const getappreciation = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/appreciation`
    );

    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const gethrdv = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Main[]>(
      `https://release2.vercel.app/client/gethrdv`
    );

    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};

export const getcomptrendutypes = async () => {
  try {
    axios.defaults.baseURL = `${process.env.API_URL}`;
    const response = await axios.get<Cxuntges[]>(
      `https://release2.vercel.app/compterendu/compterendutypes`
    );

    return response.data || ([] as Main[]);
  } catch (error) {
    console.log(error);
    return [] as Main[];
  }
};
