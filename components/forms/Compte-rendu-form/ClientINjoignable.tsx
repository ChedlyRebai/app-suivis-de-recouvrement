import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ClientINjoignable = () => {
  return (
    <div className="grid grid-cols-1 gap-y-3 py-3">
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <Label htmlFor="appreciation">Appréciation gebérale</Label>
        <Input id="appreciation" type="text" />
      </div>

      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="Compterendu">Compte rendu</Label>
        <Textarea id="Compterendu" />
      </div>
    </div>
  );
};

export default ClientINjoignable;
