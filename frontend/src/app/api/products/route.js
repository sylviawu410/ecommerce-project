import pool from '../../../../lib/db'; 
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; 
import fs from "fs/promises";
import path from "path";

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

export async function POST(request) {
  try {
    // Parse the form data
    const formData = await request.formData();

    // Extract individual fields
    const name = formData.get("name"); 
    const price = formData.get("price"); 
    const description = formData.get("description");
    const catid = formData.get("catid"); 
    const imageFile = formData.get("image"); 

    // Validate required fields
    if (!name || !price || !description || !catid || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate the uploaded image
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Invalid image type. Only JPG, PNG, or GIF are allowed." },
        { status: 400 }
      );
    }

    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size must not exceed 10MB." },
        { status: 400 }
      );
    }

    // Save the image file to the "public/uploads" directory
    const uploadsDir = path.join(process.cwd(), "public");
    await fs.mkdir(uploadsDir, { recursive: true }); // Ensure the directory exists

    // Generate a unique filename for the image
    const shortUuid = uuidv4().replace(/-/g, "").slice(0, 8); 
    const uniqueFilename = `${shortUuid}-${imageFile.name}`;
    const imagePath = path.join(uploadsDir, uniqueFilename);

    // Save the image file
    const arrayBuffer = await imageFile.arrayBuffer();
    await fs.writeFile(imagePath, Buffer.from(arrayBuffer));

    // Insert the product into the MySQL database
    const query = `
      INSERT INTO products (name, price, description, catid, image_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [name, price, description, catid, `${uniqueFilename}`];

    const [result] = await pool.query(query, values);

    // Respond with success
    return NextResponse.json(
      { message: "Product inserted successfully", productId: result.insertId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting product:", err);
    return NextResponse.json(
      { error: "An error occurred while inserting the product" },
      { status: 500 }
    );
  }
}