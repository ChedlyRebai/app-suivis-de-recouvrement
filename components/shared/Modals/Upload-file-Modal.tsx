"use client";

import React from "react";
import Modal from "./Modal";
import useAddDroitModal from "@/hooks/useAddDroitModal";
import AddDroitForm from "@/components/forms/AddDroitForm";

const UploadFiles = () => {
  const { isOpen, onOpen, onClose } = useAddDroitModal();
  return (
    <Modal
      title="Ajouter un droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
      Uplaoud
    </Modal>
  );
};

export default UploadFiles;
