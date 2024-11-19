// calendar.jsx
import React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ja } from 'date-fns/locale';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  ...props
}) {
  return (
    <DayPicker
      selected={selected}
      onSelect={onSelect}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "space-y-4",
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex flex-col relative items-center pb-4",
        caption_label: "text-base font-semibold mb-2",
        nav: "flex space-x-4 absolute top-0",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7",
        head_cell: 
          "text-muted-foreground font-medium text-center text-sm h-8",
        row: "grid grid-cols-7 mt-1",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          props.mode === "range"
            ? "[&:has([aria-selected])]:rounded-none first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary !text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...iconProps }) => (
          <ChevronLeft className="h-4 w-4" {...iconProps} />
        ),
        IconRight: ({ ...iconProps }) => (
          <ChevronRight className="h-4 w-4" {...iconProps} />
        ),
      }}
      formatters={{
        formatWeekdayName: (weekday) => {
          const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
          return weekdays[weekday.getDay()];
        }
      }}
      locale={ja}
      weekStartsOn={0}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export default Calendar;