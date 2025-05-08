"use client";

import Link from 'next/link';


const ProductCard = ({ productId, imageUrl, title, price }) => {
  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = currentCart.findIndex((item) => item.pid === productId);

    if (existingIndex !== -1) {
      // Product already in cart, increment quantity
      currentCart[existingIndex].quantity += 1;
    } else {
      // Add new product to cart
      currentCart.push({ pid: productId, quantity: 1, image_url: imageUrl, name: title, price:price });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.dispatchEvent(new Event("storage")); // Trigger update in Navbar
  };

  return (
    <div className="product-card">
      <Link href={{
        pathname: `/product/${encodeURIComponent(productId)}`,
      }}>
        <div >
          <img src={imageUrl} className="product-card-img" />
        </div>
        <p className="title ">{title}</p>
        </Link>
        <div className="container">
          <p className="price">${price}</p>
          <button onClick={addToCart} className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50">Add To Cart</button>
        </div>
      
    </div>
  );
}

export default ProductCard;