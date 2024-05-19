"use server";
import axios from "axios";
import { Console } from "console";
import { cookies, headers } from "next/headers";

export const acces = async () => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const headersList = headers();
    const getPath = headersList.get("referer") || "";

    const res = await axios.post("http://localhost:10000/droit/accesspage", {
      page: getPath,
    });

    return res.data;
  } catch (error) {}
};

export const creteAcess = async (path: string) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const headersList = headers();
    const getPath = headersList.get("referer") || "";

    const res = await axios.post("http://localhost:10000/droit/createaccess", {
      page: path,
    });
    console.log(res.data);

    return true;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccess = async () => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const headersList = headers();
    const getPath = headersList.get("referer") || "";

    const res = await axios.post("http://localhost:10000/droit/deleteaccess", {
      page: getPath,
    });

    return res.data;
  } catch (error) {}
};

export const modifyAccess = async () => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const headersList = headers();
    const getPath = headersList.get("referer") || "";

    const res = await axios.post("http://localhost:10000/droit/modifyaccess", {
      page: getPath,
    });

    return res.data;
  } catch (error) {}
};
