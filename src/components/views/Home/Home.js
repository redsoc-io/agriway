import { FaSearch } from "react-icons/fa";
// import NewOffer from "./Newoffer";
// import GrabYourLastOrder from "./GrabYourLastOrder";
import Products from "./Products";
import { useState } from "react";

function Search({ setSearch }) {
  return (
    <div className="search-bar">
      <div className="search-bar-container flex items-center justify-center">
        <div className="search-bar-input">
          <input
            type="text"
            placeholder="Search for products, brands, categories, etc."
            className="border border-blue-600 rounded-md px-3 py-2"
            onChange={({ target }) => { setSearch(target.value) }}
          />
        </div>
        <div className="search-bar-icon ml-2">
          <button className="px-3 py-2 flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 text-white">
            <span className="mr-1">
              <FaSearch />
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default function HomeView() {
  const [search, setSearch] = useState("");
  return (
    <section className="w-full h-screen py-6">
      <div className="w-full flex items-center justify-between px-2 lg:flex-row flex-col">
        <div>
          <h1 className="text-3xl">New Offers</h1>
        </div>
        <div>
          <Search setSearch={setSearch} />
        </div>
      </div>
      <Products search={search} />
    </section>
  );
}
