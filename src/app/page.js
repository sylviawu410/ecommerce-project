import ProductCard from './components/ProductCard.js';
import Navbar from './components/Navbar.js';

export default function Home() {
  return (
    <div className="main-page min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar></Navbar>
      <img src="background.png" className="w-full" />
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
            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-stone-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
              Product Type
              <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" cliprule-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">Furniture</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1">Sofas</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-2">Homeware</a>
            </div>
          </div>
        </div>
      </section>
      <main>
        <div className='display'>
          <ProductCard title="The Dandy chair" imageUrl="furniture1.png" price='$650' ></ProductCard>
          <ProductCard title="Rustic Vase Set" imageUrl="furniture2.png" price='$375' ></ProductCard>
          <ProductCard title="The Silky Vase" imageUrl="furniture3.png" price='$296' ></ProductCard>
          <ProductCard title="The Lucy Lamp" imageUrl="furniture4.png" price='$385' ></ProductCard>
        </div>


      </main>
      <footer className="row-start-3 flex flex-wrap pt-20 items-center justify-center">
        <div>made by Sylvia Wu, 1155177379</div>
      </footer>
    </div>
  );
}
