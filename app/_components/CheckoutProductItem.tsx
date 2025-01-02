import { Card } from "@/components/ui/card";
import { ProductType } from "@/lib/types";
import React from "react";
import Image from "next/image";
import { formatCurrencyINR } from "@/utils";
import { useCart } from "../_context/CartContext";

type Props = {
  product: ProductType;
};

const CheckoutProductItem = ({ product }: Props) => {
  const { removeFromCart } = useCart();
  return (
    <Card className='p-3 flex gap-5 justify-between items-center'>
      <div className='flex gap-5'>
        <Image
          src={product?.imageUrl}
          alt={product?.title}
          width={100}
          height={100}
          className='object-cover h-[80px] w-[80px]'
        />
        <div>
          <h2 className='font-medium text-lg'>{product.title}</h2>
          <h2 className='text-gray-400'>{product?.category}</h2>
          <button
            className='text-red-500 cursor-pointer'
            onClick={() => removeFromCart(product)}>
            Remove
          </button>
        </div>
      </div>
      <h2 className='font-bold text-lg'>{formatCurrencyINR(product?.price)}</h2>
    </Card>
  );
};

export default CheckoutProductItem;
