import useCompteRenduModal from '@/hooks/use-compte-rendu-modal';
import React from 'react'
import Modal from './Modal';

const CompteRenduModal = () => {
  const {id,isOpen, onOpen, onClose } = useCompteRenduModal();
  
  return (
    <Modal
    title="Actualisez vos droits d'accès"
    description="Trouvez et mettez à jour vos fonctions en quelques clics"
    isOpen={isOpen}
    onChange={onClose}
  >
    {id}
  </Modal>
  )
}

export default CompteRenduModal