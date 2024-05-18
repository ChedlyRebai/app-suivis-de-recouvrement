"use client";

import Uploader from "../uploader";
import Modal from "./Modal";
import useUploadFileModal from "@/hooks/use-UploadFile-Modal";

const UploadFiles = () => {
  const { isOpen, onClose } = useUploadFileModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Téléverser un fichier"
      description="Formats acceptés : .pdf , .word"
      isOpen={isOpen}
      onChange={onClose}
    >
      <Uploader />
    </Modal>
  );
};

export default UploadFiles;
