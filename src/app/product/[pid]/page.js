"use client";

import { useParams } from 'next/navigation'
import Navbar from '../../components/Navbar.js'
import { useEffect, useState } from 'react';

export async function fetchProductById(pid) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${pid}`);
  if (!res.ok) throw new Error(`Failed to fetch product with ID ${pid}`);
  return res.json();
}

export default function DetailPage() {
  const { pid } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function loadProduct() {
      if (!pid) {
        console.error("no product id provided");
        return;
      }
      try {
        const data = await fetchProductById(pid);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }

    loadProduct();
  }, [pid]);

  return (
    <div className='product-page'>
      <Navbar></Navbar>
      <main>
        <div className='container'>
          <img
            src={product.image_url ? `/${product.image_url}` : "/placeholder.jpg"}
            alt={product.name || "Product image"}
            onError={(e) => (e.target.src = "/placeholder.jpg")} 
          />
          <div className="text">
            <div className="breadcrumb flex pb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <a href="http://localhost:3000" className="inline-flex items-center text-sm font-medium text-black-700 hover:text-blue-600 ">
                    Home
                  </a>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Product</span>
                  </div>
                </li>
              </ol>
            </div>
            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
            <h4>Description</h4>
            <p>{product.description}</p>
            <p className='pt-4'>- Premium material</p>
            <p>- Handmade upholstery</p>
            <p>- Quality timeless classic</p>
            <div className='row pt-20'>

              <button className="inline-flex  gap-x-1.5  bg-black px-3 py-3 text-sm text-white shadow-xs ring-stone-300 ring-inset hover:text-black  hover:bg-gray-50">Add To Cart</button>
            </div>
          </div>

        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap pt-20 items-center justify-center">
        <div>Wu Mei Yin 1155177379</div>
      </footer>

    </div>


  );
}