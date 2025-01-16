import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useEffect } from "react";

export function DatePicker({ value, onChange }) {
 const [date, setDate] = useState(new Date());
 useEffect(() => {
  if (value) setDate(value);
 }, [value]);

 const handleDateSelect = (selectedDate) => {
  setDate(selectedDate);
  if (onChange) {
   onChange(selectedDate); // Update form state with selected date
  }
 };

 return (
  <Popover>
   <PopoverTrigger asChild>
    <Button
     variant={"outline"}
     className="w-full justify-start text-left font-normal"
    >
     <CalendarIcon className="mr-2 h-4 w-4" />
     {date ? format(date, "PPP") : <span>{format(new Date(), "PPP")}</span>}
    </Button>
   </PopoverTrigger>
   <PopoverContent className="w-auto p-0">
    <Calendar
     mode="single"
     selected={value}
     onSelect={handleDateSelect}
     initialFocus
     disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
    />
   </PopoverContent>
  </Popover>
 );
}
