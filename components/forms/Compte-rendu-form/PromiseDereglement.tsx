import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'

import { format } from "date-fns";
const PromiseDereglement = () => {
    const [date, setdate] = useState(new Date())
  return (
    <div className="">
                <div className="flex p-4">
                  <div className="flex flex-col mr-4">
                    <Label
                      className="mb-1 text-sm font-medium   "
                      htmlFor="amount"
                    >
                      Montant
                    </Label>

                    <Input
                      className="border p-2"
                      id="amount"
                      placeholder="850 672.280"
                    />
                  </div>
                  <div className="flex flex-col mr-4">
                    <Label
                      className="mb-1 text-sm font-medium   "
                      htmlFor="amount"
                    >
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col">
                    <Label
                      className="mb-1 text-sm font-medium "
                      htmlFor="location"
                    >
                      Lieu
                    </Label>
                    <Input
                      className="border p-2"
                      id="location"
                      placeholder="Lieu"
                    />
                  </div>
                </div>
              </div> 
  )
}

export default PromiseDereglement