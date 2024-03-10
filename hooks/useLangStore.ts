import create from "zustand";

export type State = {
  lang: any;
  getLang: () => {};
  setLang: (lang: {}) => void;
};

const useLangStore = create<State>((set, get) => ({
  lang: {},
  setLang: (lang) => set({ lang }),
  getLang: () => get().lang,
}));

export default useLangStore;
