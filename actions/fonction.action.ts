"use server";
import { fonction } from "@/Models/fonction.model";
import axios from "axios";

export const getAllFunctions = async () => {
  console.log(`${process.env.API_URL}/fonction`);
  axios.defaults.baseURL =
    "https://app-suivis-de-recouvrement-server-37up.vercel.app/";
  const res = await axios.get<fonction[]>(`/fonction`);
  return res.data;
};
