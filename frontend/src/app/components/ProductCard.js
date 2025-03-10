"use client";

import Link from 'next/link';


const ProductCard = ({ imageUrl, title, price,product }) => {


  return (
    <div className="product-card">
      <Link href={{
        pathname: `/product/${encodeURIComponent(title)}`,
        query: { title, imageUrl, price }
      }}>
        <div >
          <img src={imageUrl} className="product-card-img" />
        </div>
        <p className="title ">{title}</p>
        <div className="container">
          <p className="price">${price}</p>
          <button  className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50">Add To Cart</button>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;