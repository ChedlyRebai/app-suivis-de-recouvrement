"use client";
import useEditDroit from "@/hooks/use-edit-droit-modal";
import Modal from "../Modal";
import EditDroitForm from "../../forms/EditDroitForm";

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
