import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductType } from "@/lib/types";
import { formatCurrencyINR } from "@/utils";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { useCart } from "../_context/CartContext";

const CartProductItem = ({ product }: { product: ProductType }) => {
  const { removeFromCart } = useCart();

  // const removeCartItem = async () => {
  //   const updatedCart = cart.filter((item) => item.id !== product.id);
  //   setCart(updatedCart);
  //   await axios.delete(`/api/cart?recordId=${product?.id}`);
  //   toast("Item Removed");
  // };

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
        <h2
          className='text-red-500 cursor-pointer'
          onClick={() => removeFromCart(product)}>
          Remove
        </h2>
      </div>
    </Card>
  );
};

export default CartProductItem;
