"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, List, ListIcon } from "lucide-react";
import React, { useState } from "react";

import { format } from "date-fns";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import useListeAgencestModal from "@/hooks/useListeAgences";
const PromiseDereglement = () => {
  const [date, setdate] = useState(new Date());
  const { onOpen } = useListeAgencestModal();
  return (
    <div className="">
      <div className="flex p-4">
        <div className="flex flex-col mr-4">
          <Label className="mb-1 text-sm font-medium   " htmlFor="amount">
            Montant
          </Label>

          <Input className="border p-2" id="amount" placeholder="850 672.280" />
        </div>
        <div className="flex flex-col mr-4">
          <Label className="mb-1 text-sm font-medium   " htmlFor="amount">
            Date
          </Label>
          <DatePickerDemo />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1 text-sm font-medium " htmlFor="location">
            Lieu
          </Label>
          <div className="flex ">
            <Button className="w- px-2"  onClick={onOpen}>
              <ListIcon />
            </Button>
            <Input className="border p-2 ml-2" id="location" placeholder="Lieu" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseDereglement;
