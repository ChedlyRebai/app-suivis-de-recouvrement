import { create } from "zustand";

interface FonctionSearchModalStore {
  isOpen: boolean;
  id: string;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal = create<FonctionSearchModalStore>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
