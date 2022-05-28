import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdFactCheck } from "react-icons/md";
import React, { useEffect, useState } from "react";
const base64 = require("base-64");


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

class AddInventory extends React.Component {
    state = {
        product_id: "",
        trader_id: "",
        product_grading: "",
        arrived_at: "",
        arrived_quantity: "",
        price: "",
        products: [],
        traders: []
    }
    async getProducts() {
        const response = await fetch("/api/products");
        const json = await response.json();
        console.log(json);
        this.setState({ products: json || [] });
    }
    async getTraders() {
        const response = await fetch("/api/traders");
        const json = await response.json();
        this.setState({ traders: json.inventory });
    }
    componentDidMount() {
        this.getProducts()
        this.getTraders()
    }

    async addInventory() {
        const { product_id, trader_id, product_grading, arrived_at, arrived_quantity, price } = this.state;
        if (product_id && trader_id && product_grading && arrived_at && arrived_quantity && price) {
            const response = await fetch("/api/inventory/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newInventoryData: base64.encode(
                        JSON.stringify({ product_id, trader_id, product_grading, arrived_at, arrived_quantity, price })
                    ),
                }),
            });
            this.props.updateInventory();
        }
    }
    render() {
        const buttonDisabled = this.state.product_id === "" || this.state.trader_id === "" || this.state.product_grading === "" || this.state.arrived_quantity === "" || this.state.arrived_at === ""
        return (
            <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 bg-blue-500/20 flex items-center justify-center">
                <div className="w-5/6 w-4/5 bg-white absolute p-3 flex items-center justify-center flex-col rounded-lg">
                    <div className="w-full flex items-center justify-end">
                        <button className="p-3 rounded-full bg-gray-200" onClick={() => { this.props.toggleAddInventory() }}>
                            <AiFillCloseCircle />
                        </button>
                    </div>
                    <h1 className="text-3xl py-3">Add an Inventory</h1>
                    <form className="py-5"
                        ref={(el) => this.myFormRef = el}
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.addInventory();
                            this.myFormRef.reset();
                            this.props.toggleAddInventory()
                        }}>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-full">
                                <div className="px-2 w-full">
                                    <select className="bg-gray-200 px-2 py-2 rounded-md w-full"
                                        onChange={({ target }) => {
                                            this.setState({ trader_id: target.value })
                                        }}>
                                        {!this.state.trader_id &&
                                            <option value="">Select your Trader</option>}
                                        {
                                            this.state.traders.map((trader, index) => {
                                                return (
                                                    <option key={index} value={trader.id}>{trader.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-full">
                                <div className="px-2 w-full">
                                    <select className="bg-gray-200 px-2 py-2 rounded-md w-full"
                                        onChange={({ target }) => {
                                            this.setState({ product_id: target.value })
                                        }}>
                                        {!this.state.product_id &&
                                            <option value="">Select a product</option>}
                                        {
                                            this.state.products.map((product, index) => {
                                                return (
                                                    <option key={index} value={product.id}>{product.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-1/2">
                                <div className="px-2">
                                    <select className="bg-gray-200 px-2 py-2 rounded-md w-full"
                                        onChange={({ target }) => {
                                            this.setState({ product_grading: target.value })
                                        }} >
                                        {!this.state.product_grading &&
                                            <option value="">Select a grading</option>
                                        }
                                        <option value="K">K</option>
                                        <option value="A1">A1</option>
                                        <option value="A2">A2</option>
                                        <option value="A3">A3</option>
                                        <option value="B1">B1</option>
                                        <option value="B2">B2</option>
                                        <option value="B3">B3</option>
                                        <option value="C1">C1</option>
                                        <option value="C2">C2</option>
                                        <option value="C3">C3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="px-2 w-full">
                                    <input type="datetime-local" className="bg-gray-200 px-2 py-2 rounded-md w-full" placeholder="Arrived At"
                                        onChange={({ target }) => {
                                            this.setState({ arrived_at: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-full">
                                <div className="px-2 w-full">
                                    <input type="number" className="bg-gray-200 w-full px-2 py-2 rounded-md" placeholder="Arrived Quantity (in KGs)"
                                        onChange={({ target }) => {
                                            this.setState({ arrived_quantity: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-full">
                                <div className="px-2 w-full">
                                    <input type="number" className="bg-gray-200 w-full px-2 py-2 rounded-md" placeholder="Price Per KG (in RS)"
                                        onChange={({ target }) => {
                                            this.setState({ price: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-1/2">
                                <button
                                    disabled={buttonDisabled}
                                    className={`w-full ${buttonDisabled ? 'opacity-50' : ''} px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold flex items-center justify-center`}>
                                    <span className="mr-2"><MdFactCheck /></span>
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

class SellProducts extends React.Component {
    state = {
        quantity: 0,
        location: "",
        cities: []
    }
    getCities = async () => {
        const response = await fetch('/api/cities');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ cities: body });
    }
    componentDidMount() {
        this.getCities();
    }
    async sendTransportation() {
        const data = await fetch("/api/inventory/transport", {
            method: "POST",
            body: JSON.stringify({
                quantity: this.state.quantity,
                location: this.state.location,
                inventory_id: this.props.inventory_id
            }),
        });
        const body = await data.json();
        this.props.updateInventory()
    }
    render() {
        const buttonDisabled = this.state.product_id === "" || this.state.trader_id === "" || this.state.product_grading === "" || this.state.arrived_quantity === "" || this.state.arrived_at === ""
        return (
            <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 bg-blue-500/20 flex items-center justify-center">
                <div className="w-5/6 w-4/5 bg-white absolute p-3 flex items-center justify-center flex-col rounded-lg">
                    <div className="w-full flex items-center justify-end">
                        <button className="p-3 rounded-full bg-gray-200" onClick={() => { this.props.toggleAddInventory() }}>
                            <AiFillCloseCircle />
                        </button>
                    </div>
                    <h1 className="text-3xl py-3">Transport Product</h1>
                    <form className="py-5"
                        ref={(el) => this.myFormRef = el}
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.sendTransportation();
                            this.myFormRef.reset();
                            this.props.toggleAddInventory()
                        }}>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-full">
                                <div className="px-2 w-full">
                                    <input type="number" className="bg-gray-200 w-full px-2 py-2 rounded-md" placeholder="Arrived Quantity (in KGs)"
                                        onChange={({ target }) => {
                                            this.setState({ quantity: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-full">
                                <div className="px-2 w-full">
                                    <select className="bg-gray-200 px-2 py-2 rounded-md w-full"
                                        onChange={({ target }) => {
                                            this.setState({ location: target.value })
                                        }}>
                                        {!this.state.product_id &&
                                            <option value="">Select a city</option>}
                                        {
                                            this.state.cities.map((product, index) => {
                                                return (
                                                    <option key={index} value={product.city + ", " + product.state}>{product.city}, {product.state}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-full">
                                <button
                                    disabled={buttonDisabled}
                                    className={`w-full ${buttonDisabled ? 'opacity-50' : ''} px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold flex items-center justify-center`}>
                                    <span className="mr-2"><MdFactCheck /></span>
                                    <span>Initiate Transportation</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function Inventory() {
    const [showAddInventory, setShowAddInventory] = useState(false);
    const [showTransportStart, setShowTransportStart] = useState(false)
    const [inventory, setInventory] = useState([]);
    async function getInventory() {
        const response = await fetch("/api/inventory");
        const data = await response.json();
        setInventory(data.inventory);
    }
    useEffect(() => {
        getInventory()
    }, [])
    return (
        <>
            <div className="flex items-center justify-center text-3xl py-5">
                <h1>Inventory</h1>
            </div>
            <div className="flex items-center justify-center py-2  ">
                <button
                    onClick={() => { setShowAddInventory(!showAddInventory) }}
                    className="bg-green-600 hover:bg-green-700 m-2 px-4 p-2 rounded-full text-white flex items-center justify-center">
                    <span className="flex items-center justify-center">
                        <IoMdAddCircleOutline />
                    </span>
                    <span className="ml-2">Add Inventory</span>
                </button>
            </div>
            <div className="w-full">
                <table className="w-full border-separate border border-slate-400 ">
                    <thead>
                        <tr >
                            <Th className="flex items-center justify centre">Product Name</Th>
                            <Th>Product Grading</Th>
                            <Th>Arrived At</Th>
                            <Th>Current Location</Th>
                            <Th>Arrived Quantity</Th>
                            <Th>Sell</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((inventory, index) => {
                            const parser = new Date(inventory.arrived_at);
                            return (
                                <tr key={index}>
                                    <Td>{inventory.product_name}</Td>
                                    <Td>{inventory.product_grading}</Td>
                                    <Td>{inventory.arrived_at}</Td>
                                    <Td>{inventory.location ? inventory.location : "With Farmer"}</Td>
                                    <Td>{inventory.quantity} KGs</Td>
                                    <Td>
                                        {
                                            !inventory.location &&
                                            <button
                                                onClick={() => {
                                                    setShowTransportStart(inventory.id)
                                                }}
                                                className="bg-green-600 hover:bg-yellow-400 p-2 px-4 m-2 rounded-full text-white flex items-center justify-center">
                                                <span>
                                                    <AiFillCheckCircle />
                                                </span>
                                                <span className="ml-2">Sell</span>
                                            </button>
                                        }
                                    </Td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {
                showAddInventory && <AddInventory
                    toggleAddInventory={() => { setShowAddInventory(!showAddInventory) }}
                    updateInventory={() => { getInventory() }}
                />
            }
            {
                showTransportStart && <SellProducts
                    toggleAddInventory={() => { setShowTransportStart(!showTransportStart) }}
                    updateInventory={() => { getInventory() }}
                    inventory_id={showTransportStart}
                />
            }
        </>
    );
}
export default Inventory;
