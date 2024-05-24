import { create } from "zustand";

interface demandeProlongationModalStore {
  id?: string | number;
  setId: (id: string | number) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDemandeProlongationModal = create<demandeProlongationModalStore>(
  (set) => ({
    id: undefined,
    isOpen: true,
    setId: (id) => set({ id }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useDemandeProlongationModal;
