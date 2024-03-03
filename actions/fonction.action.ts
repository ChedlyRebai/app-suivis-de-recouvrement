"use server";
import { fonction } from "@/Models/fonction.model";
import axios from "axios";

export const getAllFunctions = async () => {
  console.log(`${process.env.API_URL}/fonction`);
  axios.defaults.baseURL = "http://localhost:10000/";
  const res = await axios.get<fonction[]>(`/fonction`);
  return res.data;
};
