import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useClientSore from "@/hooks/useCompteRenduForm";
import React from "react";

const NonreconnaissancedelaCreanceForm = () => {
  const {client,handleIputChangeSuiviAgenda,suiviAgenda}=useClientSore()
  return (
    <div className="my-3">
      <Label className="text-md">Observetion</Label>
      <Textarea className="m-1" onChange={(e)=> handleIputChangeSuiviAgenda("observation",e.target.value)} value={suiviAgenda.observation} />
    </div>
  );
};

export default NonreconnaissancedelaCreanceForm;
