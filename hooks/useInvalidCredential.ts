import { create } from "zustand";

interface InvalidCredentialModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useInvalidCredentialModal = create<InvalidCredentialModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useInvalidCredentialModal;
