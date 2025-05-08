import pool from '../../../../lib/db'; 
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [products] = await pool.query('SELECT * FROM products;');
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}