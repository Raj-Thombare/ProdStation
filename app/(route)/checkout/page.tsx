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

const page = () => {
  const { cart, setCart, totalAmount } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    const response = await axios.post("/api/order", { amount: totalAmount });
    return response.data.orderId;
  };

  const handlePayment = async () => {
    setLoading(true);
    setIsProcessing(true);

    try {
      const orderId = await createOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        Currency: "INR",
        name: "ProdStation",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verificationResult = await axios.post("/api/order", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              orderDetail: cart,
              email: user?.primaryEmailAddress?.emailAddress,
              validateTxs: true,
            });

            if (verificationResult.data.success) {
              setCart([]);
              toast("Order created successfully!");
              router.replace("/dashboard");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
        },
        modal: {
          ondismiss: function () {
            toast("Payment canceled. Please try again.");
            setLoading(false);
            setIsProcessing(false);
          },
        },
        prefill: {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Error processing payment.");
    }
    setLoading(false);
    setIsProcessing(false);
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
            <hr className='my-5 border-black'></hr>
            <p>Your payment receipt will be delivered to your email</p>
            <div>
              Registered email id:
              {user && (
                <Badge className='ms-2'>
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
              {loading ? (
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

export default page;
