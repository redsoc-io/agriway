import Product from "./ProductUnit";

export default function GrabYourLastOrder() {
  return (
    <div>
      <h1 className="px-2 text-xl font-bold">Grab your Last order</h1>
      <div className="flex items-center justify-center">
        <Product
          productName="Green Chilly"
          url="/products/greenchilly.jpeg"
          price="10"
          size="w-1/4"
        />
        <Product
          productName="Spinach"
          url="/products/spinach.jpg"
          price={"15"}
          size="w-1/4"
        />
        <Product
          productName="Garlic"
          url="/products/garlic.jpg"
          price={"85"}
          size="w-1/4"
        />
        <Product
          productName="Cauliflower"
          url="/products/cauliflower.jpg"
          price={"40"}
          size="w-1/4"
        />
      </div>
    </div>
  );
}
