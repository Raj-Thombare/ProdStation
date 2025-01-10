import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

type Props = {
  onSortChange: (value: string) => void;
};

const SortProducts = ({ onSortChange }: Props) => {
  const list = [
    {
      label: "Newest",
      field: "id",
      order: "desc",
    },
    {
      label: "Price (Low to High)",
      field: "price",
      order: "asc",
    },
    {
      label: "Price (High to Low)",
      field: "price",
      order: "desc",
    },
    {
      label: "Most Viewed",
      field: "id",
      order: "desc",
    },
  ];

  return (
    <div className='w-full flex justify-end'>
      <Select onValueChange={(value) => onSortChange(value)}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Sort' />
        </SelectTrigger>

        <SelectContent>
          {list.map((option, idx) => {
            return (
              <SelectItem
                key={idx}
                className='cursor-pointer'
                value={JSON.stringify(option)}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortProducts;
