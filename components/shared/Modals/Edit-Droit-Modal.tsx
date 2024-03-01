"use client";

import useEditDroit from "@/hooks/use-edit-droit-modal";
import EditDroitForm from "../../forms/EditDroitForm";
import Modal from "./Modal";

const EditDroitModal = () => {
  const { id, isOpen, onOpen, onClose } = useEditDroit();
  return (
    <Modal
      title="Actualisez vos droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={isOpen}
      onChange={onClose}
    >
      <EditDroitForm />
    </Modal>
  );
};

export default EditDroitModal;
