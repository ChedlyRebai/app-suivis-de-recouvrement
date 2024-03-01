import { create } from "zustand";

interface EditDroitModalStore {
  isOpen: boolean;
  id: string;
  modification: string;
  creation: string;
  suppression: string;
  acces: string;
  setId: (id: string) => void;
  onOpen: () => void;
  onClose: () => void;
  setModification: (modification: string) => void;
  setSuppresion: (suppression: string) => void;
  setCreation: (creation: string) => void;
  setAccess: (acces: string) => void;
}

const useEditDroit = create<EditDroitModalStore>((set) => ({
  isOpen: false,
  id: "",
  modification: "",
  creation: "",
  suppression: "",
  acces: "",
  setId: (id: string) => set({ id }),
  setModification: (modification: string) => set({ modification }),
  setSuppresion: (suppression: string) => set({ suppression }),
  setCreation: (creation: string) => set({ creation }),
  setAccess: (acces: string) => set({ acces }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditDroit;
