import { eq } from 'drizzle-orm';
import { db } from "@/config/db";
import { orderTable, productsTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const user = await currentUser();

    try {
        const result = await db.select().from(orderTable)
            .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress!)).innerJoin(productsTable, eq(orderTable.productId, productsTable.id))
            .innerJoin(usersTable, eq(usersTable.email, productsTable.createdBy))

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: "error occured!" }, { status: 500 })
    }
}