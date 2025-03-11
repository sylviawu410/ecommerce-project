import { NextResponse } from "next/server";

// Mock product data
const products = [
  { pid: 1, name: "Product 1", price: 100, image: "/images/product1.jpg" },
  { pid: 2, name: "Product 2", price: 200, image: "/images/product2.jpg" },
  { pid: 3, name: "Product 3", price: 300, image: "/images/product3.jpg" },
]




// Handle GET requests
export async function GET(request, { params }) {
  const { pid } = await params;

  const product = products.find((p) => p.pid === parseInt(pid));
  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}