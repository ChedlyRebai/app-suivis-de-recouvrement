import { create } from "zustand";

interface demandeProlongationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDemandeProlongationModal = create<demandeProlongationModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useDemandeProlongationModal;
