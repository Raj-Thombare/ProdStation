import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';
import { db } from "@/config/db";
import { cartTable, orderTable, productsTable } from "@/config/schema";
import { OrderType } from "@/lib/types";
import { eq, getTableColumns, desc } from "drizzle-orm";
import { Resend } from 'resend';
const crypto = require('crypto');
import ProdstationReceiptEmail from "@/emails/email";
import { currentUser } from "@clerk/nextjs/server";

const resend = new Resend(process.env.RESEND_API_KEY!);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function POST(req: NextRequest) {
    try {
        const {
            paymentId,
            orderId,
            signature,
            orderDetail,
            email,
            amount,
            validateTxs,
        } = await req.json();

        if (validateTxs) {
            if (!paymentId || !orderId || !signature || !orderDetail || !email) {
                return NextResponse.json(
                    { error: "Missing required fields" },
                    { status: 400 }
                );
            }

            const orderList: OrderType[] = orderDetail.map((order: OrderType) => ({
                email,
                productId: order.id!,
            }));

            const body = `${orderId}|${paymentId}`;
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
                .update(body)
                .digest("hex");

            if (expectedSignature === signature) {
                await db.insert(orderTable).values(orderList);
                await db.delete(cartTable).where(eq(cartTable?.email, email));

                const sendEmailResult = await sendEmail({
                    email,
                    amount,
                    orderId,
                    orderDetail,
                });

                return NextResponse.json(
                    { success: true, message: "Order created successfully" },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { error: "Invalid signature" },
                    { status: 400 }
                );
            }
        }

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Math.random().toString(36).substring(7)}`,
        });

        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Error creating order" },
            { status: 500 }
        );
    }
}

const sendEmail = async (orderDetail: {
    email: string;
    orderId: string;
    amount: number;
    orderDetail: OrderType[];
}) => {
    const user = await currentUser();

    const result = await resend.emails.send({
        from: 'support@rajthombare.xyz',
        to: user?.primaryEmailAddress?.emailAddress!,
        subject: 'Your Order Receipt from ProdStation',
        react: ProdstationReceiptEmail(orderDetail)
    });

    return result;
};

export async function GET(req: NextRequest) {

    const user = await currentUser();

    const result = await db.select({
        ...getTableColumns(productsTable)
    }).from(orderTable)
        .where(eq(orderTable.email, user?.primaryEmailAddress?.emailAddress!))
        .innerJoin(productsTable, eq(productsTable.id, orderTable.productId))
        .orderBy(desc(orderTable.id))

    return NextResponse.json(result)
}
