import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { ab_client } from "@/Models/ab_client.model";
import { create } from "zustand";

interface useClientSoreInterface {
    client: ClientRecouv ;
    suiviAgenda:SuiviAgenda;
    seTsuiAgenda:(suiviAgenda:SuiviAgenda)=>void;
    setClient: (client: ClientRecouv) => void;
    handleIputChangeSuiviAgenda: (champ:string,value:string) => void;
}

const useClientSore = create<useClientSoreInterface>((set) => ({
    client: {} as ClientRecouv,
    suiviAgenda:{} as SuiviAgenda,
    seTsuiAgenda:(suiviAgenda:SuiviAgenda)=>set({suiviAgenda}),
    setClient: (client) => set({ client }),
    handleIputChangeSuiviAgenda: (champ,value) => {
        set((state) => ({
            suiviAgenda: {
                ...state.suiviAgenda,
                [champ]: value,
            },
        }));

    },
}));

export default useClientSore;
