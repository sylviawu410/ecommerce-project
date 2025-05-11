"use client";
import ProductCard from './components/ProductCard.js';
import Navbar from './components/Navbar.js';
import { useEffect, useState } from 'react';

export async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default function HomePage() {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isCategoryListCLicked, setIsCategoryListClicked] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data); 
        // console.log("categories data: ", data)
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      }
    }

    async function loadProducts(){
      try {
        const data = await fetchProducts();
        setProducts(data);
        console.log("product data: ", data)
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message); 
      }
    }

    loadCategories();
    loadProducts();
  }, []);

  return (
    <div className="main-page min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar></Navbar>
      <img src="./background.png" className="w-full" alt='background' />

      <section className="info">
        <div className="breadcrumb flex" aria-label="Breadcrumb">
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
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Home</span>
              </div>
            </li>
          </ol>
        </div>

        <div className="filter relative inline-block text-left">
          <div>
            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50" id="menu-button"
              aria-expanded={isCategoryListCLicked} aria-haspopup={isCategoryListCLicked}
              onClick={() => setIsCategoryListClicked(!isCategoryListCLicked)}>
              Category List
              <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
              </svg>
            </button>
          </div>
          {(isCategoryListCLicked) && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
              role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                { categories.length > 0 ? (
                  <ul>
                    {categories.map((category) => (
                      <li className='px-4 py-2 text-sm text-gray-700' key={category.catid} >{category.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Loading categories...</p>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
      <main>
        <div className='display'>
          {products.map((product) => (<ProductCard key={product.pid} productId={product.pid} title={product.name} price={product.price} imageUrl={product.image_url}></ProductCard>))}
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap pt-20 items-center justify-center">
        <div>WU Mei Yin 1155177379</div>
      </footer>
    </div>
  );
}
