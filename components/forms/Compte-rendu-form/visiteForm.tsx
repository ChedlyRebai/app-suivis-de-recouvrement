import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const VisiteForm = () => {
  return (
    <div className="grid grid-cols-1 gap-y-3 py-3">
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <Label htmlFor="Datevisite">Date visite</Label>
        <Input id="Datevisite" type="text" />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="heureviste">Date visite</Label>
        <Input id="heureviste" type="text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="lieuvisite">Lieu visite</Label>
        <Input id="lieuvisite" type="text" />
      </div>
    </div>
  );
};

export default VisiteForm;
