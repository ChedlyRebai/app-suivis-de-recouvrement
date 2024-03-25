import { create } from "zustand";

interface ListAgencesStore {
  isOpen: boolean;
  column:string;
  modelName: string;
  onOpen: (modelname:string,column: string) => void; 
  onClose: () => void;
}

const useListeAgencestModal = create<ListAgencesStore>((set) => ({
  isOpen: false,
  column:"",
  modelName:"",
  onOpen: (modelName, column) => set({ isOpen: true, modelName, column }),  
  onClose: () => set({ isOpen: false }),
}));

export default useListeAgencestModal;