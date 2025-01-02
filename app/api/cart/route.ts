import { db } from "@/config/db";
import { cartTable, productsTable } from "@/config/schema";
import { getTableColumns, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, productId } = await req.json();

    const result = await db.insert(cartTable).values({
        email: email,
        productId: productId
    }).returning();

    return NextResponse.json(result)
}

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required!' }, { status: 400 })
    }

    const result = await db.select({
        ...getTableColumns(productsTable),
        ...getTableColumns(cartTable)
    }).from(cartTable)
        .where(eq(cartTable.email, email))
        .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))

    return NextResponse.json(result)
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get('recordId');

    if (!recordId) {
        return NextResponse.json({ error: 'Id is required!' }, { status: 400 })
    }

    await db.delete(cartTable)
        .where(eq(cartTable.id, Number(recordId)));

    return NextResponse.json({ response: "Item Removed" })
}