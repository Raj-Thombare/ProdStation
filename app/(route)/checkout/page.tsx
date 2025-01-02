"use client";

import CheckoutProductItem from "@/app/_components/CheckoutProductItem";
import { useCart } from "@/app/_context/CartContext";
import { Card } from "@/components/ui/card";
import { formatCurrencyINR } from "@/utils";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { cart, setCart, totalAmount } = useCart();
  return (
    <div className='mt-10'>
      <h2 className='font-bold text-3xl'>Checkout</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-10'>
        <div className='flex flex-col gap-3'>
          {cart.map((product, idx) => (
            <CheckoutProductItem product={product} key={idx} />
          ))}
        </div>

        <div>
          <Card className='p-5'>
            <h2 className='font-bold text-2xl flex justify-between'>
              Total: <span>{formatCurrencyINR(totalAmount)}</span>
            </h2>
            <hr className='my-5 border-black'></hr>
            <p>
              Your payment receipt and product will be delivered to your email
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
