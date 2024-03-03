import AddDroitModal from "@/components/shared/Modals/Add-Droit-modal";
import EditDroitModal from "@/components/shared/Modals/Edit-Droit-Modal";
import InvalidCredentialModal from "@/components/shared/Modals/Invalid-Credential-Modal";
import IInvalidCredentialModal from "@/components/shared/Modals/Invalid-Credential-Modal";
import SearchFonctionModal from "@/components/shared/Modals/Search-Fonction-Modal";
import React from "react";

const ModalProviders = () => {
  return (
    <>
      <EditDroitModal />
      <AddDroitModal />
      <SearchFonctionModal />
      <InvalidCredentialModal />
    </>
  );
};

export default ModalProviders;
