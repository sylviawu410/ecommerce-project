"use client";

import React, { useState } from "react";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <nav className="w-full navbar">
      <div className="icon w-3/10">IERG4210</div>
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
          <form className="bg-white absolute right-0 z-10 p-3 w-[500px] origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
            <div className="row gap-5 mb-3">
              <img className="shop-item" src="/furniture1.png" alt='' />
              <div className="shop-item-name w-7/10 grow">The Dandy chair</div>
              <input type="text" name="number" id="price" className="w-[30px] mx-5 py-1 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6 outline-gray-200" placeholder="1" />
              <div className="mx-5">$100</div>
            </div>
            <div className="text-right">
              <button className="inline-flex bg-black px-3 py-3 text-sm text-white shadow-xs ring-stone-300 ring-inset hover:text-black hover:bg-gray-50">Checkout</button>
            </div>
          </form>
        )}
      </div>
    </div>
    </nav>
  );
}

export default Navbar;