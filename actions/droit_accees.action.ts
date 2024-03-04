"use server";

import { droit_accees } from "@/Models/droit_accees.model";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getAllDroitAccess = async () => {
  console.log(`${process.env.API_URL}/droit`);
  const res = await axios.get(`${process.env.API_URL}/droit`);
  return res.data;
};

export const getDroitAccessByCodeFonction = async (code: string) => {
  console.log(
    `${process.env.API_URL}/droit/getByCodeFunc?codeFunction=${code}`
  );
  const res = await axios.get(
    `${process.env.API_URL}/droit/getByCodeFunc?codeFunction=${code}`
  );

  return res.data;
};

//localhost:10000/droit/updateDroit
export const updateDroitAccessById = async (
  id: number,
  suppression: string,
  modification: string,
  creation: string,
  acces: string
) => {
  console.log(`${process.env.API_URL}/droit/droit/updateDroit`);
  revalidatePath("/access-management");
  revalidatePath("/");
  revalidatePath("/access-management");
  const res = await axios.put(`${process.env.API_URL}/droit/updateDroit`, {
    id,
    suppression,
    modification,
    creation,
    acces,
  });
  console.log(id, suppression, modification, creation, acces);
  console.log(res.data);
  revalidatePath("/access-management?code=11");
  revalidatePath("/access-management");
  revalidatePath("/");
  return res.data;
};

export const createDroit = async (
  nom: string,
  nom_module: string,
  code_fonction: string,
  suppression: string,
  modification: string,
  creation: string,
  acces: string
) => {
  console.log(`${process.env.API_URL}/droit/addDroit`);
  try {
    console.log(
      nom,
      nom_module,
      suppression,
      modification,
      creation,
      acces,
      code_fonction
    );

    const res = await axios.post(`${process.env.API_URL}/droit/addDroit`, {
      nom,
      nom_module,
      code_fonction,
      acces,
      creation,
      modification,
      suppression,
    });
    console.log(nom, nom_module, suppression, modification, creation, acces);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
