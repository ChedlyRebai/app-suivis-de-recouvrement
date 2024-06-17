"use client";

import Uploader from "../uploader";
import Modal from "./Modal";
import useUploadFileModal from "@/hooks/use-UploadFile-Modal";

const UploadFiles = () => {
  const { isOpen, onClose, id } = useUploadFileModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  console.log(id);
  return (
    <Modal
      title="Téléverser un fichier"
      description="Formats acceptés : .pdf "
      isOpen={isOpen}
      onChange={onClose}
    >
      <Uploader />
    </Modal>
  );
};

export default UploadFiles;
