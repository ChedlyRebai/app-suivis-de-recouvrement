"use server";
import { ab_client } from "@/Models/ab_client.model";
import { fonction } from "@/Models/fonction.model";
import axios from "axios";
import { cookies } from "next/headers";

export const getClientContactes = async () => {
  console.log(`${process.env.API_URL}/fonction`);
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssssss");
  console.log(session);
  axios.defaults.baseURL = `${process.env.API_URL}`;
  axios.defaults.headers.common["Authorization"] = ` ${
    session?.value as string
  }`;
  const res = await axios.get<ab_client[]>(
    `http://localhost:10001/client/listclientcontactes`
  );
  console.log(res.data);
  return res.data;
};

export const getClientNonContactes = async () => {
  console.log(`${process.env.API_URL}/fonction`);
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  axios.defaults.baseURL = `${process.env.API_URL}`;
  axios.defaults.headers.common["Authorization"] = ` ${
    session?.value as string
  }`;
  const res = await axios.get<ab_client[]>(
    `http://localhost:10001/client/listclientnoncontactes`
  );
  console.log(res.data);
  return res.data;
};
