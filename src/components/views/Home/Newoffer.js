import Product from "./ProductUnit";
import { CgDetailsMore } from "react-icons/cg"
export default function NewOffer() {
  return (
    <>
      <div className="flex items-center justify-center pt-6 py-6 text-xl font-bold text-center">
        <Product
          productName="Tomato"
          url="/products/tomato.jpg"
          price="30"
          size="w-1/4"
        />
        <Product
          productName="Carrot"
          url="/products/carrot.jpg"
          price={"55"}
          size="w-1/4"
        />
        <Product
          productName="Cabbage"
          url="/products/cabbage.jpg"
          price={"35"}
          size="w-1/4"
        />
        <Product
          productName="Potato"
          url="/products/potato.jpg"
          price={"32"}
          size="w-1/4"
        />
      </div>
      <div className="flex justify-end p-2 ">
        <button className="bg-green-600 hover:bg-red-700 p-4 px-4 m-6 rounded-md text-white flex items-center justify-center">
          <span className="ml-2">More</span>
          <span className="flex text-lg">
            <CgDetailsMore />
          </span>

        </button>
      </div>
    </>
  );
}
