"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";

interface datePickerProps {
  date:Date | string | any;
  setDate: (champ: string, value: string | any) => void;
  champ: string ;
  disabled?:boolean;
}
export function DatePickerDemo({
  date,
  setDate,
  champ,
  disabled:disable
}: datePickerProps) {
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
        disabled={disable}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start  text-left font-normal",
            !date && `text-muted-foreground cursor-not-allowe ${disable && "cursor-not-allowed"} `, 
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 w" />
          {date ? format(date, "PPP") : <span>Choisis une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={(selectedDate) => {
            console.log(selectedDate);
            setDate(champ?.toString(), selectedDate)
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
