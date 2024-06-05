import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useClientSore from "@/hooks/useCompteRenduForm";
import React from "react";

const NouvelleCoordonneeForm = () => {
  const { client, handleIputChangeSuiviAgenda, suiviAgenda } = useClientSore();
  return (
    <div className=" mx-auto my-2 p-2  rounded-lg shadow-md">
      <div className="flex flex-col grid-cols-2 gap-4 mb-4">
        <div className="flex w-[280px] flex-col  mr-4">
          <Label className="mb-1 text-sm font-medium" htmlFor="amount">
            Telephone 1
          </Label>

          <Input
            className="border p-2"
            onChange={(e) =>
              handleIputChangeSuiviAgenda("nouv_tel", e.target.value)
            }
            value={suiviAgenda.nouv_tel}
            id="amount"
            placeholder="e.x: 28 651 733"
          />
        </div>

        <div className="flex w-[280px] flex-col  mr-4">
          <Label className="mb-1 text-sm font-medium " htmlFor="location">
            Telephone 2
          </Label>
          <Input
            onChange={(e) => {
              console.log(suiviAgenda.nouv_te2);
              handleIputChangeSuiviAgenda("nouv_te2", e.target.value);
              handleIputChangeSuiviAgenda("nouv_tel2", e.target.value);
            }}
            value={suiviAgenda.nouv_te2}
            className="border p-2"
            id="location"
            placeholder="e.x: 21 652 433"
          />
        </div>
      </div>
      <div className="flex w-[280px] flex-col mr-4">
        <Label className="mb-1 text-sm font-medium " htmlFor="location">
          Addresse
        </Label>
        <Textarea
          onChange={(e) =>
            handleIputChangeSuiviAgenda("nouv_adresse", e.target.value)
          }
          value={suiviAgenda.nouv_adresse}
          className="border p-2"
          id="location"
          placeholder="e.x: Tunis, Ariana"
        />
      </div>
    </div>
  );
};

export default NouvelleCoordonneeForm;
