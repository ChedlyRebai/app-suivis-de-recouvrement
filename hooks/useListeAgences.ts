import { create } from "zustand";

interface ListAgencesStore {
  isOpen: boolean;
  column: string;
  modelName: string;
  selectedValue: string;
  onOpen: () => void;
  setColumn: (column: string) => void;
  onClose: () => void;
}

const useListeAgencestModal = create<ListAgencesStore>((set) => ({
  isOpen: false,
  column: "test",
  modelName: "",
  selectedValue: "",
  setColumn: (column) =>{ 
    console.log(column)
    set({ column: column })},
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useListeAgencestModal;
