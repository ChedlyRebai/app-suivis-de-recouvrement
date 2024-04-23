"use server ";

import { Cxuntges } from "@/Models/Cxuntges.model";
import axios from "axios";

export const getTypeTransfer = async (): Promise<Cxuntges> => {
    try {
        axios.defaults.baseURL = `${process.env.API_URL}`;
        const response = await axios.get<Cxuntges>(
            `http://localhost:10001/client/typetransfer`
        );
        return response.data || {} as Cxuntges;
    } catch (error) {
        console.log(error);
        return {} as Cxuntges;
    }
};