"use client";

import React, { useCallback } from "react";
import Modal from "./Modal";
import useAddDroitModal from "@/hooks/useAddDroitModal";
import AddDroitForm from "@/components/forms/AddDroitForm";
import { useDropzone } from "react-dropzone";

const UploadFiles = () => {
    const onDrop = useCallback((acceptedFiles:any) => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    

  return (
    <Modal
      title="Ajouter un droits d'accès"
      description="Trouvez et mettez à jour vos fonctions en quelques clics"
      isOpen={true}
      onChange={() => {}}
    >
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    </Modal>
  );
};

export default UploadFiles;
