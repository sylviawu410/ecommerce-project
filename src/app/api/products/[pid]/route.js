import pool from '../../../../../lib/db';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { pid } = await params;
    const [product] = await pool.query('SELECT * FROM products WHERE pid = ?', [pid]);
    // const [product] = await pool.query('SELECT * FROM products WHERE pid = ? LIMIT 1', [pid]);


    if (product.length === 0) {
      return NextResponse.json(
        { error: `Product with ID ${pid} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(product[0]); // Return the first result
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch the product' },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  const { pid } = params; 

  if (!pid) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    const query = `DELETE FROM products WHERE pid = ?`;
    const [result] = await pool.query(query, [pid]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Product not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the product" },
      { status: 500 }
    );
  }
}
