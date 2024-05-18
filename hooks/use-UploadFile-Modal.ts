import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { create } from "zustand";

interface UploadFileModalStore {
  id: number | string;
  isOpen: boolean;
  onOpen: () => void;
  setID: (id: number) => void;
  onClose: () => void;
}

const useUploadFileModal = create<UploadFileModalStore>((set) => ({
  isOpen: false,
  id: 0,
  setID: (id) => set({ id }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadFileModal;
