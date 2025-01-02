import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "../_context/CartContext";
import CartProductItem from "./CartProductItem";
import { Button } from "@/components/ui/button";
import { formatCurrencyINR } from "@/utils";
import Link from "next/link";

const CartList = ({ children }: { children: ReactNode }) => {
  const { cart, totalAmount } = useCart();

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({cart.length})</SheetTitle>
          <SheetDescription asChild>
            <div>
              {cart.length > 0 ? (
                <div>
                  <p>Your all cart items listed here</p>
                  <div className='flex flex-col gap-2 mt-5'>
                    {cart?.map((product, idx) => {
                      return <CartProductItem key={idx} product={product} />;
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <p className='text-xl'>Your cart is empty!</p>
                </div>
              )}
              <div>
                <h2 className='font-bold text-2xl flex justify-between mt-10'>
                  Total: <span> {formatCurrencyINR(totalAmount)}</span>
                </h2>
                <Link href='/checkout'>
                  <Button className='w-full mt-3' disabled={cart.length == 0!!}>
                    CHECKOUT
                  </Button>
                </Link>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartList;
