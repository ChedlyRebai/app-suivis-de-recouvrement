"use server";
import { fonction } from "@/Models/fonction.model";
import axios from "axios";

export const getAllFunctions = async () => {
  console.log(`${process.env.API_URL}/fonction`);
  axios.defaults.baseURL = `${process.env.API_URL}`;
  const res = await axios.get<fonction[]>(`https://app-suivis-de-recouvrement-ser-git-69cf99-chedlyrebais-projects.vercel.app/fonction`);
  return res.data;
};
