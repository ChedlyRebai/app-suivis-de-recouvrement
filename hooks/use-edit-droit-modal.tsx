import { create } from "zustand";

interface EditDroitModalStore {
  isOpen: boolean;
  id: string;
  onOpen: () => void;
  onClose: () => void;
}

const useEditDroit = create<EditDroitModalStore>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditDroit;
