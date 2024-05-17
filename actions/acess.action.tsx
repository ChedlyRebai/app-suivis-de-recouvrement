"use server";
import axios from "axios";
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
    console.log(
      "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
      res.data
    );
    return res.data;
  } catch (error) {}
};
