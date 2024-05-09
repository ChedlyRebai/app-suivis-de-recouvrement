import AddDroitModal from "@/components/shared/Modals/Add-Droit-modal";
import CompteRenduModal from "@/components/shared/Modals/Compte-Rendu-Modal";
import EditDroitModal from "@/components/shared/Modals/Edit-Droit-Modal";
import InvalidCredentialModal from "@/components/shared/Modals/Invalid-Credential-Modal";
import IInvalidCredentialModal from "@/components/shared/Modals/Invalid-Credential-Modal";
import SearchFonctionModal from "@/components/shared/Modals/Search-Fonction-Modal";
import ListeAgenceModal from "@/components/shared/Modals/liste-agences-modal";
import React from "react";

const ModalProviders = () => {
  return (
    <>
      <EditDroitModal />
      <AddDroitModal />
      <ListeAgenceModal />
      <SearchFonctionModal />
      
    </>
  );
};

export default ModalProviders;
