import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const NouvelleCoordonneeForm = () => {
  return (
    <div className=" mx-auto my-2 p-2  rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col mr-4">
          <Label className="mb-1 text-sm font-medium   " htmlFor="amount">
            Tel
          </Label>

          <Input className="border p-2" id="amount" placeholder="850 672.280" />
        </div>

        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-medium " htmlFor="location">
            Tel2
          </Label>
          <Input className="border p-2" id="location" placeholder="Lieu" />
        </div>
      </div>
      <div className="flex flex-col">
        <Label className="mb-1 text-sm font-medium " htmlFor="location">
          Lieu
        </Label>
        <Textarea className="border p-2" id="location" placeholder="Lieu" />
      </div>
    </div>
  );
};

export default NouvelleCoordonneeForm;
