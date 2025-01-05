import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';
import { db } from "@/config/db";
import { cartTable, orderTable } from "@/config/schema";
import { OrderType } from "@/lib/types";
import { eq } from "drizzle-orm";
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(req: NextRequest) {
    try {
        const { paymentId, orderId, signature, orderDetail, email, amount, validateTxs } = await req.json();

        if (validateTxs) {
            let orderList: OrderType[] = [];

            orderDetail.forEach((order: OrderType) => {
                orderList.push({
                    email: email,
                    productId: order?.productId!,
                } as OrderType)
            });

            const body = orderId + "|" + paymentId;

            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");

            if (expectedSignature === signature) {

                await db.insert(orderTable).values(orderList)

                await db.delete(cartTable).where(eq(cartTable?.email, email))

                return NextResponse.json({ success: true, message: "Order created successfully" }, { status: 200 });
            } else {
                return NextResponse.json({ error: "Invalid signature" }, { status: 500 });
            }
        }

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: 'receipt_' + Math.random().toString(36).substring(7)
        })

        return NextResponse.json({ orderId: order.id }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: 'error creating order' }, { status: 500 })
    }
}