import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { db } from "@/config/db";
import { productsTable, usersTable } from "@/config/schema";
import { ProductData } from "@/lib/types";
import { desc, eq, getTableColumns } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const image = formData.get('image');
    const file = formData.get('file');
    const dataString = formData.get('data');

    if (!dataString || typeof dataString !== 'string') {
        return NextResponse.json({ error: "Missing or invalid product data" }, { status: 400 });
    }

    let data: ProductData;
    try {
        data = JSON.parse(dataString) as ProductData;
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON format for product data" }, { status: 400 });
    }

    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
        return NextResponse.json({ error: "Title is required and must be a non-empty string" }, { status: 400 });
    }

    if (!(image instanceof File)) {
        return NextResponse.json({ error: "Invalid image file" }, { status: 400 });
    }

    if (!(file instanceof File)) {
        return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    const imageName = `${Date.now()}-${image.name}`;
    const fileName = `${Date.now()}-${file.name}`;

    const { error: imageUploadError } = await supabase.storage
        .from("prodstation")
        .upload(imageName, image, {
            contentType: image.type,
        });

    const { error: fileUploadError } = await supabase.storage
        .from("prodstation")
        .upload(fileName, file, {
            contentType: file.type,
        });

    if (imageUploadError || fileUploadError) {
        return NextResponse.json({ error: imageUploadError?.message || fileUploadError?.message }, { status: 500 });
    }

    const { data: imageData } = supabase.storage.from("prodstation").getPublicUrl(imageName);
    const { data: fileData } = supabase.storage.from("prodstation").getPublicUrl(fileName);

    const imageUrl = imageData.publicUrl;
    const fileUrl = fileData.publicUrl;

    const result = await db.insert(productsTable).values({
        title: data.title,
        category: data.category,
        description: data.description,
        fileUrl,
        imageUrl,
        price: data.price,
        about: data.about,
        message: data.message,
        createdBy: data.userEmail,
    }).returning();

    return NextResponse.json(result);
}

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: "Email is required!" }, { status: 400 })
    }

    const result = await db.select({
        ...getTableColumns(productsTable),
        user: {
            name: usersTable.name,
            image: usersTable.image
        }
    }).from(productsTable).innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email)).where(eq(productsTable.createdBy, email)).orderBy(desc(productsTable.id));

    return NextResponse.json({ result })
}
