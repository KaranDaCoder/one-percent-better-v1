"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker({ selectedDate, onSelect }) {
 return (
  <Popover>
   <PopoverTrigger asChild>
    <Button
     variant={"outline"}
     className={cn(
      "justify-center text-left font-normal w-full",
      !selectedDate && "text-muted-foreground"
     )}
    >
     <CalendarIcon className="mr-2 h-4 w-4" />
     {selectedDate ? format((selectedDate), "PPP") : "Pick a start date"}
    </Button>
   </PopoverTrigger>
   <PopoverContent className="w-full p-0">
    <Calendar mode="single" selected={selectedDate} onSelect={onSelect} />
   </PopoverContent>
  </Popover>
 );
}
