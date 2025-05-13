"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export async function fetchProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

const Navbar = () => {

  //authentication related
  const router = useRouter();
  const [userType, setUserType] = useState('guest');
  const [isAdmin, setIsAdmin] = useState(false);

  //UI
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  //shopping cart
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);


  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUserType("guest");
        setIsAdmin(false);
        localStorage.removeItem('userType');
        alert("Logged out")
        router.push('/'); //home page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

// useEffect(() => {
//   try {
//     const storedUser = localStorage.getItem('user');

//     if (storedUser) {
//       const user = JSON.parse(storedUser);

//       if (  user.isAdmin === 0 ||  user.isAdmin === 1 ) {
//         setUserType(user.isAdmin ? "admin" : "user");
//       } else {
//         console.warn('Invalid user object in localStorage:', user);
//         setUserType('guest');
//       }
//     } else {
//       setUserType('guest');
//     }
//   } catch (error) {
//     console.error('Error parsing user from localStorage:', error);
//     setUserType('guest'); 
//   }
// }, []);

//   useEffect(() => {
//     async function checkAdminStatus() {
//       const cookies = document.cookie;
//       const hasAuthToken = cookies.includes('authToken=');

//       if (!hasAuthToken) {
//         setIsAdmin(false);

//         setUserType('guest');
//         return;
//       }
//       try {
//         const response = await fetch('/api/admin/validate', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setIsAdmin(data.isAdmin);
//           setUserType(data.isAdmin ? 'admin' : 'user');
//         } else {
//           setIsAdmin(false);
//           setUserType('user');
//         }

//       } catch (err) {
//         console.error('Error checking admin status:', err);
//         setIsAdmin(false);
//         setUserType('guest');

//       }
//     }

//     checkAdminStatus();
//   }, []);

useEffect(() => {
  async function checkAdminStatus() {
    try {
      // Check if the user is already stored in localStorage
      const storedUser = localStorage.getItem('user');

      const cookies = document.cookie;
      const hasAuthToken = cookies.includes('authToken=');

      if (!hasAuthToken) {
        console.log("No auth token found, setting userType to guest");
        setIsAdmin(false);
        setUserType('guest');
        if (storedUser) {
        const user = JSON.parse(storedUser);
        // console.log("User from localStorage:", user);
        setUserType(user.isAdmin ? 'admin' : 'user');
        if(user.isAdmin){
          setIsAdmin(user.isAdmin); 
        }
        
      } else {
        setUserType('guest'); 
      }
        return;
      }

      // Validate the auth token with the server
      const response = await fetch('/api/admin/validate', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Admin validation response:", data);

        setIsAdmin(data.isAdmin);
        setUserType(data.isAdmin ? 'admin' : 'user');

        const updatedUser = {
          id: data.id || null, 
          email: data.email || null, 
          isAdmin: data.isAdmin,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        console.log("Token validation failed, setting userType to user");
        setIsAdmin(false);
        setUserType('user');
      }
    } catch (err) {
      console.error('Error checking admin status:', err);
      setIsAdmin(false);
      setUserType('guest');
    }
  }

  checkAdminStatus();
}, []);

  // fetch cart from localStorage when the component mounts
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
    async function loadProducts() {
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

  //  total amount
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

  const updateQuantity = (pid, quantity) => {
    const updatedCart = cart.map((item) =>
      item.pid === pid ? { ...item, quantity: Math.max(1, quantity) } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (pid) => {
    const updatedCart = cart.filter((item) => item.pid !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <nav className="w-full navbar gap-3">
      <Link href='/'>
        <div className="icon w-3/10">IERG4210</div>
      </Link>

      {(isAdmin) ? (
        <Link href="/admin" className="ml-auto mr-3">
          <div >Admin Panel</div>
        </Link>
      ) : (
        <div className="ml-auto ">Welcome, {userType}</div>
      )}

      {(userType === "admin" || userType === "user") ? (
        <div onClick={handleLogout} className="cursor-pointer">Log out</div>) : (
        <Link href="/login" >
          <div >Login</div>
        </Link>
      )
      }



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
            <img className="shopping-cart" src="/shopping-cart.svg" alt='shopping cart image' />
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
                          <img className="shop-item" src={`/${item.image_url}`} alt='' />
                          <div className=" w-7/10 grow">{item.name}</div>
                          <div>${item.price}</div>
                          <input
                            type="number"
                            min="0"
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