import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChartLine, PenBox, Trash2 } from "lucide-react";
import DeleteDialogConfirmation from "./DeleteDialogConfirmation";
import { ProductType } from "@/lib/types";
import axios from "axios";

const ProductEditableOption = ({
  children,
  product,
}: {
  children: React.ReactNode;
  product: ProductType;
}) => {
  const deleteProductHandler = async () => {
    const result = await axios.delete("/api/products?productId=" + product?.id);
    console.log(result);
    window.location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <ul>
          <li className='flex gap-2 hover:bg-slate-100 p-2 rounded-md cursor-pointer'>
            <PenBox /> Edit
          </li>
          <li className='flex gap-2 hover:bg-slate-100 p-2 rounded-md cursor-pointer'>
            <ChartLine /> Analytics
          </li>
          <li className='flex gap-2 hover:bg-slate-100 p-2 rounded-md cursor-pointer text-red-600'>
            <DeleteDialogConfirmation deleteProduct={deleteProductHandler}>
              <h2 className='flex gap-2'>
                <Trash2 /> Delete
              </h2>
            </DeleteDialogConfirmation>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ProductEditableOption;
