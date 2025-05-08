"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';

export async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    // console.log("storedCart:", storedCart)
  }, []);

  useEffect(() => {
    const onStorageUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
    };

    window.addEventListener("storage", onStorageUpdate);
    return () => window.removeEventListener("storage", onStorageUpdate);
  }, []);

  useEffect(() => {
    async function loadProducts(){
      try {
        const data = await fetchProducts();
        setProducts(data); 
        // console.log("product data: ", data)
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message); 
      }
    }
    loadProducts();
  }, []);

  // Calculate total amount
  useEffect(() => {
    const calculateTotal = async () => {
      let totalAmount = 0;
      for (const item of cart) {
        totalAmount += item.price * item.quantity;
      }
      setTotal(totalAmount);
    };
    if (cart.length > 0) {
      calculateTotal();
    } else {
      setTotal(0);
    }
  }, [cart, products]);

  // Update quantity
  const updateQuantity = (pid, quantity) => {
    const updatedCart = cart.map((item) =>
      item.pid === pid ? { ...item, quantity: Math.max(1, quantity) } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (pid) => {
    const updatedCart = cart.filter((item) => item.pid !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <nav className="w-full navbar">
      <Link href='/'>
        <div className="icon w-3/10">IERG4210</div>
      </Link>

      <Link href="/admin" className="ml-auto mr-3">
        <div >Admin</div>
      </Link>

      <div className="relative inline-block mr-5 w-6/10">
        <div>
          <button
            type="button"
            className="w-10 inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
            id="menu-button"
            aria-expanded={isHovered || isClicked}
            aria-haspopup={isHovered || isClicked}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsClicked(!isClicked)}
          >
            <img className="shopping-cart" src="/shopping-cart.svg" alt='' />
          </button>
          {((isHovered || isClicked)) && (
            <form className="bg-white absolute right-0 z-10 p-4 w-[500px] origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
              <div>
                <div className="mt-1">
                  {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <ul>
                      {cart.map((item) => (
                        <li key={item.pid} className="flex items-center gap-5 mb-2">
                          <img className="shop-item" src={item.image_url} alt='' />
                          <div className=" w-7/10 grow">{item.name}</div>
                          <div>${item.price}</div>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.pid, parseInt(e.target.value))}
                            className="w-[30px] mx-5 py-1 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6 outline-gray-200"
                          />
                          <button
                            onClick={() => removeItem(item.pid)}
                            className="bg-indigo-900 text-white px-2 py-1 rounded text-xs font-medium"
                          >
                            remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="my-4">
                    <strong>Total: ${total}</strong>
                  </div>
                  <div className="text-right">
                    <button className="inline-flex bg-black px-3 py-3 text-sm text-white shadow-xs ring-stone-300 ring-inset hover:text-black hover:bg-gray-50 font-medium">Checkout</button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>


    </nav>
  );
}

export default Navbar;