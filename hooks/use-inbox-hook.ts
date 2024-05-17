import { Alerte } from "@/actions/Alerts.action";
import Comp from "@/app/[locale]/test2/_component/comp";
import { CompteRenduList } from "@/constants/types";
import { create } from "zustand";

interface InboxStore {
  alerte: Alerte;
  id: number;
  setAlert: (alert: Alerte) => void;
  setId: (id: number) => void;
}

const useInbox = create<InboxStore>((set) => ({
  id: 0,
  setId: (id: number) => set({ id }),
  alerte: {} as Alerte,
  setAlert: (alerte: Alerte) => set({ alerte: alerte }),
}));

export default useInbox;
