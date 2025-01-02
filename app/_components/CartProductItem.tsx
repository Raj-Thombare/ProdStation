import { Card } from "@/components/ui/card";
import { ProductType } from "@/lib/types";
import { formatCurrencyINR } from "@/utils";
import Image from "next/image";
import React from "react";
import { useCart } from "../_context/CartContext";

const CartProductItem = ({ product }: { product: ProductType }) => {
  const { removeFromCart } = useCart();

  return (
    <Card className='flex gap-5'>
      {product?.imageUrl && (
        <Image
          src={product?.imageUrl}
          alt={product?.title || "image"}
          width={70}
          height={70}
          className='h[70px] w-[70px] object-cover'
        />
      )}
      <div>
        <h2 className='font-bold'>{product?.title}</h2>
        <h2 className='font-bold text-yellow-600 text-lg'>
          {formatCurrencyINR(product?.price)}
        </h2>
        <button
          className='text-red-500 cursor-pointer'
          onClick={() => removeFromCart(product)}>
          Remove
        </button>
      </div>
    </Card>
  );
};

export default CartProductItem;
