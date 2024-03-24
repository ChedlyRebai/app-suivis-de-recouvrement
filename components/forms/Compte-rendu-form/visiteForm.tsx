import { DatePickerDemo } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { heureVisite } from "@/constants";
import React from "react";

const VisiteForm = () => {
  return (
    <div className="grid grid-cols-1 gap-y-3 py-3">
      <div className="grid w-full max-w-sm items-center gap-1.5 ">
        <Label htmlFor="Datevisite">Date visite</Label>
        <DatePickerDemo />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="heureviste">heure visite</Label>
        <Select>
          <SelectTrigger className="w-[280px] ">
            <SelectValue placeholder="Select heure" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Heures</SelectLabel>
              {heureVisite.map((item) => (
                <SelectItem value={`${item.Code}`}>{item.libelle}H</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-[280px] items-center gap-1.5">
        <Label htmlFor="lieuvisite">Lieu visite</Label>
        <Input id="lieuvisite" type="text" />
      </div>
    </div>
  );
};

export default VisiteForm;
