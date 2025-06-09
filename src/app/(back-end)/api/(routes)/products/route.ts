import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadFile } from "../../_lib/s3";
import env from "../../_env/env";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const description = formData.get("description") as string;
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const image = formData.get("image") as File;

    if (!name || !price || isNaN(price)) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    let imageUrl = null;
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const key = randomUUID() + image.name 
      await uploadFile({
        bucket: env.S3_BUCKET,
        key,
        body: buffer,
        contentType: image.type,
      });
      imageUrl = `${env.S3_ENDPOINT}/${env.S3_BUCKET}/${key}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        imageUrl,
        description
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
