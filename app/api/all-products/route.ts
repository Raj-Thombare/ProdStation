import { db } from "@/config/db";
import { productsTable, usersTable } from "@/config/schema";
import { asc, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Sort = {
    field: keyof typeof productsTable;
    order: "asc" | "desc";
};

type RequestBody = {
    params: {
        limit: number;
        offset: number;
        searchText: string;
        sort: Sort;
    };
};

export async function POST(req: NextRequest) {

    const body = (await req.json()) as RequestBody;
    const limit = body.params.limit;
    const offset = body.params.offset;
    const searchQuery = body.params.searchText;
    const sort = body.params.sort;

    const columns = getTableColumns(productsTable);

    if (!(sort.field in columns)) {
        return NextResponse.json(
            { error: `Invalid sort field: ${sort.field}` },
            { status: 400 }
        );
    }

    const column = columns[sort.field as keyof typeof columns];

    const result = await db.select({
        ...columns,
        user: {
            name: usersTable.name,
            image: usersTable.image
        }
    }).from(productsTable)
        .where(ilike(productsTable.title, `%${searchQuery}%`))
        .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
        .orderBy(sort.order == 'desc' ? desc(column) : asc(column))
        .limit(Number(limit))
        .offset(Number(offset));
    return NextResponse.json({ result })
}