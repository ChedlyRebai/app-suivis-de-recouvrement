import EditDroitModal from "@/components/shared/Modals/Edit-Droit-Modal";
import SearchFonctionModal from "@/components/shared/Modals/Search-Fonction-Modal";
import React from "react";

const ModalProviders = () => {
  return (
    <>
      <EditDroitModal />
      <SearchFonctionModal />
    </>
  );
};

export default ModalProviders;
