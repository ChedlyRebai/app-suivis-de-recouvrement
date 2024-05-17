import {
  createDroit,
  getAllDroitAccess,
  getDroitAccessByCodeFonction,
  updateDroitAction,
} from "@/actions/droit_accees.action";
import { droit_accees } from "@/Models/droit_accees.model";
import { fonction } from "@/Models/fonction.model";
import { object } from "zod";
import { create } from "zustand";

export type State = {
  droitAccess: droit_accees[];
  fetchAllDroitAccess: () => Promise<void>;
  fetchDroitAccessByCodeFonction: (
    code: string,
    currentpage?: number,
    perpage?: number,
    search?: string
  ) => Promise<void>;
  updateDroit: (
    id: number,
    codef: number,
    value: string,
    champ: string
  ) => void;

  createDroit: (
    nom: string,
    nom_module: string,
    code_fonction: string,
    suppression: string,
    modification: string,
    creation: string,
    acces: string
  ) => Promise<void>;
};

const useStore = create<State>((set) => ({
  droitAccess: [],
  fetchAllDroitAccess: async () => {
    const data = await getAllDroitAccess();
    set({ droitAccess: data });
  },
  fetchDroitAccessByCodeFonction: async (
    code: string,
    currentpage?: number,
    perpage?: number,
    search?: string
  ) => {
    const data = await getDroitAccessByCodeFonction(
      code,
      currentpage,
      perpage,
      search
    );
    set({ droitAccess: data });
    return data;
  },

  updateDroit: async (
    id: number,
    codef: number,
    value: string,
    champ: string
  ) => {
    console.log("update in store");
    const data: any = await updateDroitAction(id, codef, value, champ);
    console.log("data1", data);
  },

  createDroit: async (
    nom: string,
    nom_module: string,
    code_fonction: string,
    suppression: string,
    modification: string,
    creation: string,
    acces: string
  ) => {
    const data = await createDroit(
      nom,
      nom_module,
      code_fonction,
      suppression,
      modification,
      creation,
      acces
    );
    set((state: any) => ({
      droitAccess: [...state.droitAccess, data],
    }));
  },
}));

export default useStore;
