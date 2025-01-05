import { db } from "@/config/db";
import { cartTable, orderTable } from "@/config/schema";
import { OrderType } from "@/lib/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
const crypto = require('crypto');

export async function POST(req: NextRequest) {
    try {
        const { paymentId, orderId, signature, orderDetail, email } = await req.json();

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

            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Invalid signature" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
    }
}
