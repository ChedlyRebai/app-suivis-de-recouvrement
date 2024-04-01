import { list } from "postcss";
import { create } from "zustand";

// i want to create store of array of agances using zustand with getAgnce with code  and set array
interface ListAgences{
    listAgences:any[];
    getAgence:(code:any)=> string;
    setAgences:(agences:any[])=> void;
}


const useListAgences= create<ListAgences>((set,get)=>({
    listAgences:[],
    getAgence: (code:any) => {
        return get().listAgences.find((agence: any) => agence.codug === code)?.libelle || "";
    },
    setAgences:(agences) =>{
        set({listAgences:agences})
    },
}))

export default useListAgences;