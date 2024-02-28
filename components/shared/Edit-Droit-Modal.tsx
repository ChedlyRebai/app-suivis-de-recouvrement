"use client";
import useEditDroit from "@/hooks/use-edit-droit-modal";
import Modal from "./Modal";

const EditDroitModal = () => {
  const { id, isOpen, onOpen, onClose } = useEditDroit();
  return (
    <Modal
      title="Liste des fontions"
      description="Rechercher une fonction"
      isOpen={isOpen}
      onChange={onClose}
    >
      {id}
    </Modal>
  );
};

export default EditDroitModal;
