const Navbar = () => {
  return (
    <nav className="w-full navbar">
      <div className="icon">IERG4210</div>
      <img className="shopping-cart" src="shopping-cart.svg" ></img>
      <form className=" bg-white w-full p-5">
        <div className="row">
          <img className="shop-item" src="furniture1.png"></img>
          <div className="shop-item-name ">The Dandy chair</div>
          <input type="text" name="number" id="price" className="pl-20 min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="1"></input>
        </div>
        <button className="inline-flex  gap-x-1.5  bg-black px-3 py-3 text-sm text-white shadow-xs ring-stone-300 ring-inset hover:text-black  hover:bg-gray-50">Checkout</button>
      </form>
    </nav>
  );
}

export default Navbar;