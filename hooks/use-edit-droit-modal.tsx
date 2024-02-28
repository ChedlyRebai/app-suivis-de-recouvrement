import { create } from "zustand";

interface EditDroitModalStore {
  isOpen: boolean;
  id: string;
  setId: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useEditDroit = create<EditDroitModalStore>((set) => ({
  isOpen: false,
  id: "",
  setId: (id: string) => set({ id }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditDroit;
