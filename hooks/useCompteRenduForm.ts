import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { ab_client } from "@/Models/ab_client.model";
import { createCompteRendu } from "@/actions/client.action";
import { create } from "zustand";

interface useClientSoreInterface {
    client: ClientRecouv ;
    suiviAgenda:SuiviAgenda;
    compteRendu:any;
    seTsuiAgenda:(suiviAgenda:SuiviAgenda)=>void;
    setClient: (client: ClientRecouv) => void;
    handleIputChangeSuiviAgenda: (champ:string,value:string) => void;
    saveSuiviAgenda: (suiviAgenda:SuiviAgenda,compteRendu:any,cli:string,type:string) =>Promise<void>;
}

const useClientSore = create<useClientSoreInterface>((set) => ({
    client: {} as ClientRecouv,
    suiviAgenda:{} as SuiviAgenda,
    seTsuiAgenda:(suiviAgenda:SuiviAgenda)=>set({suiviAgenda}),
    setClient: (client) => set({ client }),
    compteRendu:"",
    handleIputChangeSuiviAgenda: (champ,value) => {
        set((state) => ({
            suiviAgenda: {
                ...state.suiviAgenda,
                [champ]: value,
            },
        }));
    },

    saveSuiviAgenda: async (suiviAgenda,compteRendu,cli,type) => {
        const savedSuiviAgenda=await createCompteRendu(suiviAgenda,compteRendu,cli,type);
        return savedSuiviAgenda;    
    },
}));

export default useClientSore;
