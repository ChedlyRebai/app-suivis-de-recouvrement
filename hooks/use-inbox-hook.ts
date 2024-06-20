import { Alerte } from "@/actions/Alerts.action";
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
