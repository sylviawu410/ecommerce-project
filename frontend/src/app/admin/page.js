"use client";

import Navbar from './../components/Navbar.js';
import React, { useState, useEffect } from "react";

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

const AdminPage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [isClicked, setIsClicked] = useState(false);
    const [isClickedInsertProduct, setIsClickedInsertProduct] = useState(false);
    const [isClickedDeleteProduct, setIsClickedDeleteProduct] = useState(false);
    const [isClickedInsertCat, setIsClickedInsertCat] = useState(false);
    const [isClickedDeleteCat, setIsClickedDeleteCat] = useState(false);

    const [selectedCategoryInsertProduct, setSelectedCategoryInsertProduct] = useState(null);
    const [selectedCategoryDeleteProduct, setSelectedCategoryDeleteProduct] = useState(null);
    const [selectedCategoryInsertCat, setSelectedCategoryInsertCat] = useState(null);
    const [selectedCategoryDeleteCat, setSelectedCategoryDeleteCat] = useState(null);



    const [productImage, setProductImage] = useState(null); // State for the uploaded image
    const [imageError, setImageError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!validTypes.includes(file.type)) {
                setImageError("Only JPG, PNG, or GIF files are allowed");
                setProductImage(null);
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setImageError("File size must be less than 10MB");
                setProductImage(null);
                return;
            }

            setImageError(""); // Clear any previous errors
            setProductImage(file); // Save the file to state
        }
    };

    const handleSubmitInsertProduct = async (e) => {
        e.preventDefault();

        if (!selectedCategoryInsertProduct) {
            alert("Please select a category");
            return;
        }

        if (!productImage) {
            alert("Please upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("name", e.target["name-input"].value);
        formData.append("price", e.target["price-input"].value);
        formData.append("description", e.target["description-input"].value);
        formData.append("catid", selectedCategoryInsertProduct.catid);
        formData.append("image", productImage);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to insert product");
            }

            console.log("Product inserted successfully");
        } catch (err) {
            console.error(err);
            alert("Error inserting product");
        }
    };



    const handleSubmitDeleteProduct = async (e) => {
        e.preventDefault();

        if (!selectedCategoryDeleteProduct) {
            alert("Please select a product to delete");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete the product: ${selectedCategoryDeleteProduct.name}?`
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/products/${selectedCategoryDeleteProduct.pid}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete product");
            }

            alert("Product deleted successfully");
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.pid !== selectedCategoryDeleteProduct.pid)
            );
            setSelectedCategoryDeleteProduct(null); // Reset the selected product
        } catch (err) {
            console.error(err);
            alert("Error deleting product");
        }
    };


    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchCategories();
                setCategories(data);
                // console.log("categories data: ", data)
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        }

        async function loadProducts() {
            try {
                const data = await fetchProducts();
                setProducts(data);
                // console.log("product data: ", data)
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        }
        loadCategories();
        loadProducts();
    }, []);
    return (
        <div>
            <Navbar></Navbar>
            <main className='flex flex-col'>
                <div className='text-4xl mt-12 mb-10 mx-auto font-semibold'>Admin Panel</div>
                <div className=' font-medium text-lg bg-indigo-900 text-white w-full py-12 pl-8 mt-12 ml-5 '>MANAGE PRODUCTS</div>
                <div className='flex items-baseline gap-10 justify-center flex-wrap'>
                    <form className='flex flex-col' onSubmit={handleSubmitInsertProduct}>
                        <div className='flex flex-col my-10'>
                            <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Insert</div>
                            <div className="filter relative inline-block text-left">
                                <div>
                                    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                        id="product-insert-menu"
                                        aria-expanded={isClickedInsertProduct}
                                        aria-haspopup={isClickedInsertProduct}
                                        onClick={() => setIsClickedInsertProduct(!isClickedInsertProduct)}>
                                        {selectedCategoryInsertProduct ? `Category: ${selectedCategoryInsertProduct.name}` : "Select a Category"}
                                        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {(isClickedInsertProduct) && (
                                    <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {categories.length > 0 ? (
                                                <ul>
                                                    {categories.map((category) => (

                                                        <li className='px-4 py-2 text-sm text-gray-700 flex justify-between' key={category.catid}
                                                            onClick={() => {
                                                                setSelectedCategoryInsertProduct(category);
                                                                setIsClickedInsertProduct(false);
                                                            }}>
                                                            <div>cid: {category.catid}</div>
                                                            <div>{category.name}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>Loading categories...</p>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                            <label htmlFor="image-input" className="mx-auto block text-gray-900 font-medium mt-5 mb-2">
                                Product Image
                            </label>
                            <input type="file" id="image-input" accept=".jpg,.jpeg,.png,.gif" onChange={handleFileChange} className="mx-auto block w-[300px] text-sm  border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none" />
                            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
                            <button
                                type="submit"
                                className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                            >
                                Insert
                            </button>

                        </div>
                    </form>
                    <form>
                        <div className=' flex flex-col my-5'>
                            <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Update</div>
                            <div>
                                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                    id="product-insert-menu">
                                    Select a Product
                                    <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                    </svg>
                                </button>
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
                    <form className='flex flex-col' onSubmit={handleSubmitDeleteProduct}>
                        <div className='flex flex-col my-10'>
                            <div className='mx-auto text-3xl text-indigo-950 font-semibold'>Delete</div>
                            <div className="filter relative inline-block text-left">
                                <div>
                                    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm  mt-1 text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50"
                                        id="product-insert-menu"
                                        aria-expanded={isClickedDeleteProduct}
                                        aria-haspopup={isClickedDeleteProduct}
                                        onClick={() => setIsClickedDeleteProduct(!isClickedDeleteProduct)}>
                                        {selectedCategoryDeleteProduct ? `Product: ${selectedCategoryDeleteProduct.name}` : "Select a Product"}
                                        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {(isClickedDeleteProduct) && (
                                    <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {categories.length > 0 ? (
                                                <ul>
                                                    {products.map((product) => (

                                                        <li className='px-4 py-2 text-sm text-gray-700 flex justify-between' key={product.pid}
                                                            onClick={() => {
                                                                setSelectedCategoryDeleteProduct(product);
                                                                setIsClickedDeleteProduct(false);
                                                            }}>
                                                            <div>cid: {product.pid}</div>
                                                            <div>{product.name}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>Loading categories...</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                            >
                                Delete
                            </button>

                        </div>
                    </form>
                </div>

                <div className=' font-medium text-lg bg-indigo-900 text-white w-full py-12 pl-8 mt-12 ml-5'>MANAGE CATEGORIES</div>
                <div className='flex items-baseline gap-10 justify-center flex-wrap'>
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
                                        {selectedCategoryInsertProduct ? `Product: ${selectedCategoryInsertProduct.name}` : "Select a Category"}
                                        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {(isClicked) && (
                                    <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {categories.length > 0 ? (
                                                <ul>
                                                    {categories.map((category) => (

                                                        <li className='px-4 py-2 text-sm text-gray-700 flex justify-between' key={category.catid} >
                                                            <div>cid: {category.catid}</div>
                                                            <div>{category.name}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>Loading categories...</p>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                                            {categories.length > 0 ? (
                                                <ul>
                                                    {categories.map((category) => (

                                                        <li className='px-4 py-2 text-sm text-gray-700 flex justify-between' key={category.catid} >
                                                            <div>cid: {category.catid}</div>
                                                            <div>{category.name}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>Loading categories...</p>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                                        Product
                                        <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {(isClicked) && (
                                    <div className="absolute right-[45%] z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {categories.length > 0 ? (
                                                <ul>
                                                    {categories.map((category) => (

                                                        <li className='px-4 py-2 text-sm text-gray-700 flex justify-between' key={category.catid} >
                                                            <div>cid: {category.catid}</div>
                                                            <div>{category.name}</div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>Loading categories...</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button
                                className="bg-indigo-900 text-white px-4 py-2 rounded text-md font-semibold my-7 w-fit mx-auto"
                            >
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )

}

export default AdminPage;