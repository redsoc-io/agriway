import { BiRupee } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5"
import { useEffect, useState } from "react";
function Td({ children }) {
    return (
        <td className="border border-slate-300">
            <div>{children}</div>
        </td>
    );
}
function Th({ children }) {
    return (
        <td className="border border-slate-300 font-bold">
            <div>{children}</div>
        </td>
    );
}


function ProductInCart({ id, name, price, index, updateCart }) {
    return (
        <tr>
            <Td>{name}</Td>
            <Td>
                <span className="flex items-center justify-center">
                    <BiRupee />
                    {price}
                </span>
            </Td>
            <Td>
                <button
                    className="bg-red-600 hover:bg-red-700 p-2 px-4 m-2 rounded-full text-white flex items-center justify-center"
                    onClick={() => {
                        deleteFromCart(index);
                        updateCart();
                    }}>
                    <span>
                        <MdDelete />
                    </span>
                    <span className="ml-2">Delete </span>
                </button>
            </Td>
        </tr>
    )
}
function getCart() {
    const cart = window.localStorage.getItem('cart')
    if (cart) {
        const cartObj = JSON.parse(cart)
        return cartObj
    }
    return []
}

function deleteFromCart(index) {
    const cart = window.localStorage.getItem('cart')
    if (cart) {
        const cartObj = JSON.parse(cart)
        cartObj.splice(index, 1)
        window.localStorage.setItem('cart', JSON.stringify(cartObj))
    }
}

export function MyCart() {
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState([]);
    function updateCart() {
        const cart = getCart()
        var sum = 0;
        for (var i = 0; i < cart.length; i++) {
            sum += cart[i].price
        }
        setCart(cart)
        setTotalAmount(sum)
    }
    useEffect(() => {
        updateCart()
    }, [])
    return (
        <>
            <div className="flex items-center justify-center text-3xl py-5">
                <h1>My Cart</h1>
            </div>
            <div className="w-full">
                <table className="w-full border-separate border border-slate-400 ">
                    <thead>
                        <tr>
                            <Th>Item Name</Th>
                            <Th>Price</Th>
                            <Th>Delete</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(({ id, name, price }, i) =>
                            <ProductInCart
                                id={id}
                                name={name}
                                price={price}
                                key={`cart-${id}`}
                                index={i}
                                updateCart={updateCart}
                            />
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <Th>Total Amount</Th>
                            <Th>
                                <span className="flex items-center justify-center p-3">
                                    <BiRupee />
                                    {totalAmount}
                                </span>
                            </Th>
                            <Th></Th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="flex justify-end p-2 ">
                <button className="bg-green-600 hover:bg-red-700 p-4 px-4 m-6 rounded-md text-white flex items-center justify-center">
                    <span className="flex text-xl">
                        <IoBagCheckOutline />
                    </span>
                    <span className="ml-2">Checkout (Comming Soon)</span>
                </button>
            </div>
        </>
    );
}
export default MyCart;
