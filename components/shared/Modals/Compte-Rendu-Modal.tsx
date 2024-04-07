"use client"
import useCompteRenduModal from '@/hooks/use-compte-rendu-modal';
import React from 'react'
import Modal from './Modal';
import { useQuery } from '@tanstack/react-query';
import { getCompteRenduById } from '@/actions/client.action';
import { Label } from '@/components/ui/label';
import { ClipboardListIcon } from 'lucide-react';
import Oval from 'react-loading-icons/dist/esm/components/oval';

const CompteRenduModal = () => {
  const {id,isOpen, onOpen, onClose } = useCompteRenduModal();
  const { isPending, error, data } = useQuery({
    queryKey: ['getCompteRendu',id],
    queryFn:async ()=>await getCompteRenduById(id)
  })
  console.log(data)
  return (
    <Modal
    title="Compte Rendu"
    description=""
    isOpen={isOpen}
    onChange={onClose}
  >
    
     {isPending && (
      <div className='w-full flex justify-center items-center'>
      <Oval className="w-6 h-6 text-primary" />
      </div>
    )}
    {error && <div>An error has occurred: {error.message}</div>}
    {
      data && (
        <>
        <p>{data.compte_rendu}</p>
        </>
      )
    }
    {data?.compte_rendu ===''  && (
      <div className="flex justify-center items-center">
      <Label className="text-primary">
        Pas de compte rendu
      </Label>
      </div>
    
    )}
    
  </Modal>
  )
}

export default CompteRenduModal