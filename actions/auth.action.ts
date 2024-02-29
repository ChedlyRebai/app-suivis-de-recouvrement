"use server";
import { fontion } from "@/Models/fonction.model";
import axios from "axios";

export const Login = async (matricule: string, password: string) => {
  console.log(`${process.env.API_URL}/login`);
  const res = await axios.post<fontion[]>(`/login`, { matricule, password });
  return res;
};
