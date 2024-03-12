import { create } from "zustand";

interface InvalidCredentialModal {
  textError: string;
  setTextError: (text: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useInvalidCredentialModal = create<InvalidCredentialModal>((set) => ({
  textError: "",
  setTextError: (text: string) => set({ textError: text }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useInvalidCredentialModal;
