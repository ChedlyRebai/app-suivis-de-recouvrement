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
        <div className="flex w-[280px] flex-col my-1 mr-4">
          <Label className="mb-1 text-sm font-medium" htmlFor="amount">
            Tel
          </Label>

          <Input
            className="border p-2"
            onChange={(e) =>
              handleIputChangeSuiviAgenda("nouv_tel", e.target.value)
            }
            value={suiviAgenda.nouv_tel}
            id="amount"
            placeholder="850 672.280"
          />
        </div>

        <div className="flex w-[280px] flex-col my-1 mr-4">
          <Label className="mb-1 text-sm font-medium " htmlFor="location">
            Tel2
          </Label>
          <Input
            onChange={(e) =>
              handleIputChangeSuiviAgenda("nouv_tel2", e.target.value)
            }
            value={suiviAgenda.nouv_te2}
            className="border p-2"
            id="location"
            placeholder="Lieu"
          />
        </div>
      </div>
      <div className="flex w-[280px] flex-col my-1 mr-4">
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
          placeholder="Lieu"
        />
      </div>
    </div>
  );
};

export default NouvelleCoordonneeForm;
