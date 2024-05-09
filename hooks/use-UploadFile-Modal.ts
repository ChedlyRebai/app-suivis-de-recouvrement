import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { create } from "zustand";

interface UploadFileModalStore {
  id:number;
  isOpen: boolean;
  onOpen: (id:number) => void;
  onClose: () => void;
}

const useUploadFileModal = create<UploadFileModalStore>((set) => ({
  id:0,
  isOpen: false,
  onOpen: (id:number) => set({ isOpen: true, id: id}),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadFileModal;
