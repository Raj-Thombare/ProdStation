import { db } from "@/config/db";
import { productsTable, usersTable } from "@/config/schema";
import { desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const limit = body.params.limit;
    const offset = body.params.offset;
    const searchQuery = body.params.searchText;

    const result = await db.select({
        ...getTableColumns(productsTable),
        user: {
            name: usersTable.name,
            image: usersTable.image
        }
    }).from(productsTable)
        .where(ilike(productsTable.title, `%${searchQuery}%`))
        .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
        .orderBy(desc(productsTable.id))
        .limit(Number(limit))
        .offset(Number(offset));
    return NextResponse.json({ result })
}