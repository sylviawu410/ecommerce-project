"use client";

import Navbar from './../components/Navbar.js';
import React, { useState } from "react";

const AdminPage = () => {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div>
            <Navbar></Navbar>
            <main className='flex flex-col'>
                <div className='text-4xl mt-7 mx-auto font-semibold'>Admin Panel</div>
                <div className=' font-medium text-lg bg-indigo-900 text-white w-full py-8 mt-12 pl-5 '>MANAGE PRODUCTS</div>

                <form className='flex flex-col'>
                    <div className='flex flex-col my-10'>
                        <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Insert</div>
                        <div className="filter relative inline-block text-left">
                            <div>
                                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                    id="product-insert-menu"
                                    aria-expanded={isClicked}
                                    aria-haspopup={isClicked}
                                    onClick={() => setIsClicked(!isClicked)}>
                                    Category ID
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {(isClicked) && (
                                <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-insert-item-0">Furniture</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-insert-item-1">Sofas</a>
                                    </div>
                                </div>
                            )

                            }
                        </div>
                        <label htmlFor="name-input" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Name</label>
                        <input type="text" id="name-input" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the name" required />

                        <label htmlFor="price-input" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Price</label>
                        <input type="number" id="price-input" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the price" required />

                        <label htmlFor="description-input" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Description</label>
                        <textarea type="text" id="description-input" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the description" required />
                        <button
                            className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                        >
                            Insert
                        </button>

                    </div>
                </form>
                <form>
                    <div className=' flex flex-col my-5'>
                        <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Update</div>
                        <div className="filter relative inline-block text-left">
                            <div>
                                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                    id="product-update"
                                    aria-expanded={isClicked}
                                    aria-haspopup={isClicked}
                                    onClick={() => setIsClicked(!isClicked)}>
                                    Category ID
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {(isClicked) && (
                                <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-update-item-0">Furniture</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-update-item-1">Sofas</a>
                                    </div>
                                </div>
                            )

                            }
                        </div>
                        <label htmlFor="product-name-update" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Name</label>
                        <input type="text" id="product-name-update" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the name" required />

                        <label htmlFor="product-input-update" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Price</label>
                        <input type="number" id="product-input-update" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the price" required />

                        <label htmlFor="product-description-update" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Description</label>
                        <textarea type="text" id="product-description-update" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the description" required />
                        <button
                            className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                        >
                            Update
                        </button>

                    </div>
                    </form>
                    <form>
                    <div className=' flex flex-col my-5'>
                        <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Delete</div>
                        <div className="filter relative inline-block text-left">
                            <div>
                                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                    id="product-delete-menu"
                                    aria-expanded={isClicked}
                                    aria-haspopup={isClicked}
                                    onClick={() => setIsClicked(!isClicked)}>
                                    Category ID
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {(isClicked) && (
                                <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-delete-item-0">Furniture</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-delete-item-1">Sofas</a>
                                    </div>
                                </div>
                            )

                            }
                        </div>
                        <button
                            className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                        >
                            Delete
                        </button>

                    </div>
                </form>
                <div className=' font-medium text-lg bg-indigo-900 text-white w-full py-8 mt-12 pl-5 '>MANAGE CATEGORIES</div>

                <form className='flex flex-col'>
                    <div className='flex flex-col my-10'>
                        <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Insert</div>
                        <div className="filter relative inline-block text-left">
                            <div>
                                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                    id="category-insert-menu"
                                    aria-expanded={isClicked}
                                    aria-haspopup={isClicked}
                                    onClick={() => setIsClicked(!isClicked)}>
                                    Category ID
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {(isClicked) && (
                                <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="category-insert-item-0">Furniture</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="category-insert-item-1">Sofas</a>
                                    </div>
                                </div>
                            )

                            }
                        </div>
                        <label htmlFor="category-name-insert" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Name</label>
                        <input type="text" id="category-name-insert" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the name" required />

                        <label htmlFor="category-price-insert" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Price</label>
                        <input type="number" id="category-price-insert" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the price" required />

                        <label htmlFor="category-description-insert" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Description</label>
                        <textarea type="text" id="category-description-insert" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the description" required />
                        <button
                            className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                        >
                            Insert
                        </button>

                    </div>
                </form>
                <form>
                    <div className=' flex flex-col my-5'>
                        <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Update</div>
                        <div className="filter relative inline-block text-left">
                            <div>
                                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                    id="category-update"
                                    aria-expanded={isClicked}
                                    aria-haspopup={isClicked}
                                    onClick={() => setIsClicked(!isClicked)}>
                                    Category ID
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {(isClicked) && (
                                <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="category-update-item-0">Furniture</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="category-update-item-1">Sofas</a>
                                    </div>
                                </div>
                            )

                            }
                        </div>
                        <label htmlFor="category-name-update" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Name</label>
                        <input type="text" id="category-name-update" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the name" required />

                        <label htmlFor="category-input-update" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Price</label>
                        <input type="number" id="category-input-update" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the price" required />

                        <label htmlFor="category-description-update" className="mx-auto blocktext-gray-900 font-medium mt-5 mb-2">Product Description</label>
                        <textarea type="text" id="category-description-update" aria-describedby="helper-text-explanation"
                            className="mx-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                            placeholder="Enter the description" required />
                        <button
                            className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                        >
                            Update
                        </button>

                    </div>
                    </form>
                    <form>
                    <div className=' flex flex-col my-5'>
                        <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Delete</div>
                        <div className="filter relative inline-block text-left">
                            <div>
                                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                    id="product-delete-menu"
                                    aria-expanded={isClicked}
                                    aria-haspopup={isClicked}
                                    onClick={() => setIsClicked(!isClicked)}>
                                    Category ID
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            {(isClicked) && (
                                <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-delete-item-0">Furniture</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1"
                                            id="product-delete-item-1">Sofas</a>
                                    </div>
                                </div>
                            )

                            }
                        </div>
                        <button
                            className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                        >
                            Delete
                        </button>

                    </div>
                </form>

            </main>


        </div>
    )

}

export default AdminPage;