import { create } from "zustand";

interface ListAgencesStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useListeAgencestModal = create<ListAgencesStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useListeAgencestModal;
