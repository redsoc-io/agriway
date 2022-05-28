import { MdDelete, MdFactCheck } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
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

class AddTrader extends React.Component {
    state = {
        name: "",
        phone: "",
        address1: "",
        address2: "",
        locality: "",
        district: "",
        state: "",
        pincode: ""
    }
    async addTrader() {
        const { name, phone, address1, address2, locality, district, state, pincode } = this.state;
        if (name && phone && address1 && address2 && locality && district && state && pincode) {
            const response = await fetch("/api/traders/add", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newInventoryData: base64.encode(
                        JSON.stringify(this.state)
                    ),
                }),
            });
            this.props.getTraders();
        }
    }
    render() {
        const disabledButton = !(this.state.name && this.state.phone && this.state.address1 && this.state.address2 && this.state.locality && this.state.district && this.state.state && this.state.pincode);
        return (
            <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 bg-blue-500/20 flex items-center justify-center">
                <div className="w-5/6 w-4/5 bg-white absolute p-3 flex items-center justify-center flex-col rounded-lg">
                    <div className="w-full flex items-center justify-end">
                        <button className="p-3 rounded-full bg-gray-200 text-xl" onClick={() => { this.props.toggleAddTrader() }}>
                            <AiFillCloseCircle />
                        </button>
                    </div>
                    <h1 className="text-3xl py-3">Add a Trader</h1>
                    <form className="py-5"
                        ref={(el) => this.myFormRef = el}
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.addTrader();
                            this.myFormRef.reset();
                            this.props.toggleAddTrader()
                        }}
                    >
                        <div className="flex items-center justify-center py-2">
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="text"
                                        className="bg-gray-200 px-2 py-2 rounded-md"
                                        placeholder="Name"
                                        onChange={({ target }) => {
                                            this.setState({ name: target.value })
                                        }} />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="text" className="bg-gray-200 px-2 py-2 rounded-md" placeholder="Phone Number"
                                        onChange={({ target }) => {
                                            this.setState({ phone: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="text" className="bg-gray-200 px-2 py-2 rounded-md" placeholder="Address Line 1"
                                        onChange={({ target }) => {
                                            this.setState({ address1: target.value })
                                        }} />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="text" className="bg-gray-200 px-2 py-2 rounded-md" placeholder="Address Line 2"
                                        onChange={({ target }) => {
                                            this.setState({ address2: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="text" className="bg-gray-200 px-2 py-2 rounded-md" placeholder="Locality"
                                        onChange={({ target }) => {
                                            this.setState({ locality: target.value })
                                        }} />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="text" className="bg-gray-200 px-2 py-2 rounded-md" placeholder="District"
                                        onChange={({ target }) => {
                                            this.setState({ district: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="text" className="bg-gray-200 px-2 py-2 rounded-md" placeholder="State"
                                        onChange={({ target }) => {
                                            this.setState({ state: target.value })
                                        }} />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="px-2">
                                    <input type="number" className="bg-gray-200 px-2 py-2 rounded-md" placeholder="Pincode"
                                        onChange={({ target }) => {
                                            this.setState({ pincode: target.value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-2">
                            <div className="w-1/2">
                                <button
                                    disabled={disabledButton}
                                    className={`w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-bold flex items-center justify-center ${disabledButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span className="mr-2"><MdFactCheck /></span>
                                    <span>Add Trader</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function Traders() {
    const [showAddTrader, setShowAddTrader] = useState(false);
    const [traders, setTraders] = useState([]);

    async function getTraders() {
        const response = await fetch("/api/traders");
        const json = await response.json();
        console.log(json.inventory)
        setTraders(json.inventory);
    }

    async function removeTrader(id) {
        const response = await fetch(`/api/traders/remove/${id}`)
        const json = await response.json();
        getTraders()
    }

    useEffect(() => {
        getTraders()
    }, [])
    return (
        <>
            <div className="flex items-center justify-center text-3xl py-5">
                <h1>Traders</h1>
            </div>
            <div className="w-full">
                <table className="w-full border-separate border border-slate-400 ">
                    <thead>
                        <tr>
                            <Th>Trader Name</Th>
                            <Th>Contact</Th>
                            <Th>Farm Address</Th>
                            <Th>Remove Trader</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {traders.map((trader, i) => {
                            return (
                                <tr key={`trader-${i}`}>
                                    <Td>{trader.name}</Td>
                                    <Td>{trader.contact}</Td>
                                    <Td>
                                        <>
                                            <div>{trader.al_1},</div>
                                            <div>{trader.al_2},</div>
                                            <div>{trader.locality},</div>
                                            <div>{trader.district},</div>
                                            <div>{trader.state},</div>
                                            <div>{trader.pincode}</div>
                                        </>
                                    </Td>
                                    <Td>
                                        <button
                                            onClick={() => { removeTrader(trader.id) }}
                                            className="bg-red-600 hover:bg-red-700 p-2 px-4 m-2 rounded-full text-white flex items-center justify-center">
                                            <span>
                                                <MdDelete />
                                            </span>
                                            <span className="ml-2">Delete</span>
                                        </button>
                                    </Td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="flex justify-end w-full">
                    <button onClick={() => { setShowAddTrader(!showAddTrader) }} className="bg-green-600 hover:bg-yellow-700 p-2 px-4 m-2 rounded-md text-white flex items-center justify-center">
                        <span>
                            <IoIosPersonAdd />
                        </span>
                        <span className="ml-2">Add Trader </span>
                    </button>
                </div>
            </div>
            {
                showAddTrader &&
                <AddTrader toggleAddTrader={() => { setShowAddTrader(!showAddTrader) }} getTraders={() => { getTraders() }} />
            }
        </>
    );
}
export default Traders;
