import { NextResponse } from "next/server";

// Mock product data
const products = [
  { pid: 1, name: "The Dandy Chair", price: 640, imageUrl: "furniture1.png" },
  { pid: 2, name: "Rustic Vase Set", price: 206, imageUrl: "furniture2.png" },
  { pid: 3, name: "The Silky Vase", price: 390, imageUrl: "furniture3.png" },
  { pid: 4, name: "The Lucy Lamp", price: 492, imageUrl: "furniture4.png" },
];

// Handle GET requests
export async function GET(request, { params }) {
  const { product: pid } = params; // Access the dynamic 'product' parameter

  const product = products.find((p) => p.pid === parseInt(pid));
  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}