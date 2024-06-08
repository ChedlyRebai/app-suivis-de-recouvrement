"use server";
import axios from "axios";
import { Console } from "console";
import { cookies, headers } from "next/headers";
export interface Access {
  creation: string;
  modification: string;
  suppression: string;
  acces: string;
}

export const acccess = async (path: string) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;

    const res = await axios.post<Access>(
      `https://sprint1-v2-beta.vercel.app/droit/access?page=${path}`
    );
    return res.data as Access | {} as Access;
  } catch (error) {
    console.log(error);
    return {} as Access;
  }
};

export const acces = async () => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const headersList = headers();
    const getPath = headersList.get("referer") || "";

    const res = await axios.post(
      "https://sprint1-v2-beta.vercel.app/droit/accesspage",
      {
        page: getPath,
      }
    );
    return res.data;
    return { message: res.data.message, success: res.data.success };
  } catch (error) {}
};

export const createAcess = async (path: string) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;
    const headersList = headers();

    const res = await axios.post(
      "https://sprint1-v2-beta.vercel.app/droit/createaccess",
      {
        page: path,
      }
    );
    console.log(res.data);
    //{ message: 'Access granted', success: true }
    return { message: res.data.message, success: res.data.success };
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccess = async (path: string) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;

    const res = await axios.post(
      "https://sprint1-v2-beta.vercel.app/droit/deleteaccess",
      {
        page: path,
      }
    );

    return { message: res.data.message, success: res.data.success };
  } catch (error) {}
};

export const modifyAccess = async (path: string) => {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    axios.defaults.headers.common["Authorization"] = ` ${
      session?.value as string
    }`;

    const res = await axios.post(
      "https://sprint1-v2-beta.vercel.app/droit/modifyaccess",
      {
        page: path,
      }
    );

    return { message: res.data.message, success: res.data.success };
  } catch (error) {}
};
