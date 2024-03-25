import { ab_client } from "@/Models/ab_client.model";
import { create } from "zustand";

interface useClientSoreInterface {
    client: ab_client;
    setClient: (client: ab_client) => void;
    handleIputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useClientSore = create<useClientSoreInterface>((set) => ({
    client: {} as ab_client,
    setClient: (client) => set({ client }),
    handleIputChange: (e) => {
        const { name, value } = e.target;
        set((state) => ({
            client: {
                ...state.client,
                [name]: value,
            },
        }));
    },
}));

export default useClientSore;
