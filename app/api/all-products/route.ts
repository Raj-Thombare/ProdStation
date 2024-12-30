import { db } from "@/config/db";
import { productsTable, usersTable } from "@/config/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();
    const result = await db.select({
        ...getTableColumns(productsTable),
        user: {
            name: usersTable.name,
            image: usersTable.image
        }
    }).from(productsTable).innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email)).orderBy(desc(productsTable.id)).limit(Number(body.params.limit)).offset(Number(body.params.offset));
    return NextResponse.json({ result })
}