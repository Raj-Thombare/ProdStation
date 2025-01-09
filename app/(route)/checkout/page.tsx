"use client";

import CheckoutProductItem from "@/app/_components/CheckoutProductItem";
import { useCart } from "@/app/_context/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrencyINR } from "@/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useState } from "react";
import Script from "next/script";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { cart, setCart, totalAmount } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const { data } = await axios.post("/api/order", { amount: totalAmount });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "ProdStation",
        order_id: data.orderId,
        handler: async (response: any) => {
          try {
            const { data: verifyResult } = await axios.post("/api/order", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              orderDetail: cart.map((product) => ({
                id: product.productId,
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                description: product.description,
              })),
              email: user?.primaryEmailAddress?.emailAddress,
              validateTxs: true,
              amount: totalAmount,
            });

            if (verifyResult.success) {
              setCart([]);
              toast.success("Order created successfully!");
              router.replace("/dashboard");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            toast.error("Error verifying payment.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast("Payment canceled. Please try again.");
            setIsProcessing(false);
          },
        },
        prefill: {
          name: user?.fullName || "User",
          email: user?.primaryEmailAddress?.emailAddress,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("Error processing payment.");
      setIsProcessing(false);
    }
  };

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-3xl'>Checkout</h2>
      <Script src='https://checkout.razorpay.com/v1/checkout.js' />
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
            <hr className='my-5 border-black' />
            <p>Your payment receipt will be delivered to your email</p>
            <div>
              Registered email ID:
              {user && (
                <Badge className='ml-2'>
                  {user?.primaryEmailAddress?.emailAddress}
                </Badge>
              )}
            </div>
          </Card>
          <div className='mt-5'>
            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className='w-full'>
              {isProcessing ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                "Create Order"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
