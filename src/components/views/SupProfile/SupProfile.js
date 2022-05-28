import { AiFillEdit } from "react-icons/ai";
import { IoSave } from "react-icons/io5";
import React from "react";
export default class Myprofile extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        code: "",
        address: "",
    }
    async getProfile() {
        const response = await fetch("/api/account/get_account");
        const json = await response.json();
        this.setState({ first_name: json.fname, last_name: json.lname, email: json.email, phone: json.phone })
    }
    componentDidMount() {
        this.getProfile()
    }
    render() {

        var image = ""
        try {
            image = this.props.session.session.user.image
        } catch (e) { }
        const disabledButton = !(this.state.first_name && this.state.last_name && this.state.phone && this.state.email && this.state.code && this.state.address)
        return (
            <>
                <div className="w-full">

                    <div className="flex items-center justify-center flex-col">
                        <div className="h-56 w-56 bg-gray-400 rounded-full overflow-hidden relative">
                            <img src={image + "?s=300"} className="w-full h-full" />
                            <div className="absolute opacity-0 hover:opacity-50 top-0 right-0 bottom-0 w-full h-full top-0 flex items-center justify-center bg-black text-white font-bold">
                                <h1 className="text-xl text-center">Change on Gravatar</h1>
                            </div>
                        </div>
                        <div className="flex py-2 text-3xl font-bold">
                            <h1>{this.state.first_name ? `${this.state.first_name} ${this.state.last_name}` : `Name...`}</h1>
                        </div>
                        <div className="py-8">
                            <div className="flex pt-3">
                                <div className="px-2 ">
                                    <input
                                        type="text"
                                        className="border border-gray-800 rounded-md px-1 py-2"
                                        placeholder="First Name"
                                        onChange={({ target }) => {
                                            this.setState({ first_name: target.value })
                                        }}
                                        defaultValue={this.state.first_name}
                                    />
                                </div>
                                <div className="px-2">
                                    <input
                                        type="text"
                                        className="border border-gray-800 rounded-md px-1 py-2"
                                        placeholder="Last Name"
                                        onChange={({ target }) => {
                                            this.setState({ last_name: target.value })
                                        }}
                                        defaultValue={this.state.last_name}
                                    />
                                </div>
                            </div>
                            <div className="flex py-3">
                                <div className="px-2">
                                    <input
                                        type="email"
                                        className="border border-gray-800 rounded-md px-1 py-2"
                                        placeholder="Email ID"
                                        onChange={({ target }) => {
                                            this.setState({ email: target.value })
                                        }}
                                        defaultValue={this.state.email}
                                    />
                                </div>
                                <div className="px-2">
                                    <input
                                        type="text"
                                        className="border border-gray-800 rounded-md px-1 py-2"
                                        placeholder="Phone number"
                                        onChange={({ target }) => {
                                            this.setState({ phone: target.value })
                                        }}
                                        defaultValue={this.state.phone}
                                    />
                                </div>
                            </div>
                            <div className="flex px-2 py-3 w-full">
                                <input
                                    type="text"
                                    className="border border-gray-800 rounded-md px-1 py-2 w-full"
                                    placeholder="Warehouse code"
                                    onChange={({ target }) => {
                                        this.setState({ code: target.value })
                                    }}
                                    defaultValue={this.state.code}
                                />
                            </div>
                            <div className="px-2 w-full py-3">
                                <textarea
                                    className="border border-gray-800 rounded-md px-1 py-2 w-full"
                                    placeholder="Address" rows={4}
                                    onChange={({ target }) => {
                                        this.setState({ address: target.value })
                                    }}
                                    defaultValue={this.state.address}
                                ></textarea >

                            </div>
                            <div className="flex items-center justify-center w-full">
                                <button
                                    disabled={disabledButton}
                                    className={`flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 px-3 py-2 rounded-md text-white font-bold$ ${disabledButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <span>
                                        <IoSave />
                                    </span>
                                    <span className="ml-2">Save Changes</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}