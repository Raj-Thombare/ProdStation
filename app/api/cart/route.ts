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

    try {
        const result = await db.select({
            ...getTableColumns(productsTable),
            ...getTableColumns(cartTable)
        }).from(cartTable)
            .where(eq(cartTable.email, email))
            .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))

        return NextResponse.json(result)
    } catch (error) {
        console.error("Error adding cart item:", error);
        return NextResponse.json(
            { error: "Failed to add item. Please try again later." },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get('recordId');

    if (!recordId) {
        return NextResponse.json({ error: 'Id is required!' }, { status: 400 });
    }

    try {
        const deleteResult = await db.delete(cartTable).where(eq(cartTable.id, Number(recordId)));

        if (deleteResult.rowCount === 0) {
            return NextResponse.json({ error: "Item not found!" }, { status: 404 });
        }

        return NextResponse.json({ response: "Item Removed" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        return NextResponse.json(
            { error: "Failed to remove item. Please try again later." },
            { status: 500 }
        );
    }
}
