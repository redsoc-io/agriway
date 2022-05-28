import { BiRupee } from "react-icons/bi";
import Link from "next/link";
import { FaCheck, FaPlus } from "react-icons/fa";
import { useState } from "react"

function addToCart(id, name, price) {
  const cart = window.localStorage.getItem('cart')
  if (cart) {
    const cartObj = JSON.parse(cart)
    cartObj.push({ id, name, price })
    window.localStorage.setItem('cart', JSON.stringify(cartObj))
  }
  else {
    const cartObj = []
    cartObj.push({ id, name, price })
    window.localStorage.setItem('cart', JSON.stringify(cartObj))
  }
}

function Product({ url, productName, productURL, price, size, name, product_id }) {
  const [added, setAdded] = useState(false)
  function addedToClass() {
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 1000)
  }
  return (
    <div
      className={`p-2 block ${size}`}
    >
      <div className="bg-gray-100 flex py-3 items-center flex-col rounded-lg">
        <img src={url} alt={productName} className="h-48 w-48 rounded-full " />
        <h4 className="py-1">{productName}</h4>
        <h4 className="flex items-center justify-center">
          <span>
            <BiRupee />
          </span>
          <span>{price || "?"}/Kg</span>
        </h4>
        <h3>{name}</h3>
        <div className="py-2 flex items-center justify-center">
          <button className="rounded-full px-3 bg-green-600 hover:bg-green-700 py-2 text-white font-bold flex items-center justify-center"
            onClick={() => { addToCart(product_id, name, price); addedToClass() }}
          >
            {
              !added ?
                <>
                  <span className="mr-1"><FaPlus /></span>
                  <span>Add to Cart</span>
                </>
                :
                <>
                  <span className="mr-1"><FaCheck /></span>
                  <span>Added to Cart</span>
                </>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
export default Product;
