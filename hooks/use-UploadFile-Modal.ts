import { SuiviAgenda } from "@/Models/SuiviAgenda.model";
import { create } from "zustand";

interface UploadFileModalStore {
 
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadFileModal = create<UploadFileModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true}),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadFileModal;
