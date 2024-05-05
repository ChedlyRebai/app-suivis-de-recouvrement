"use server";
import { fonction } from "@/Models/fonction.model";
import axios from "axios";

export const getAllFunctions = async () => {
  console.log(`${process.env.API_URL}/fonction`);
  axios.defaults.baseURL = `${process.env.API_URL}`;
  const res = await axios.get<fonction[]>(`https://sprint1-v2-beta.vercel.app/fonction`);
  return res.data;
};
