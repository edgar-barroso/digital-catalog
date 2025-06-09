import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getProductSchema } from "../../schemas/product";

const prisma = new PrismaClient();

// GET /api/product/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { productId } = getProductSchema.parse({
      productId: (await params).id,
    });

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error get product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// DELETE /api/product/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { productId } = getProductSchema.parse({
      productId: (await params).id,
    });

    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error delete product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
