import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
const base64 = require("base-64");
import { signIn } from "next-auth/react";

function Login({ toggleSignup, toggleLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex align-center h-screen h-4/5 w-2/4 bg-white rounded-lg shadow-lg flex-col p-3">
            <div className="flex items-center justify-end">
                <button
                    className="bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded-full text-white flex items-center justify-center"
                    onClick={() => {
                        toggleLogin();
                    }}
                >
                    <span>
                        <AiFillCloseCircle />
                    </span>
                    <span className="ml-2">Close</span>
                </button>
            </div>
            <div className="w-full flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold text-center py-5">Login</h1>
                <form className="w-1/2 flex items-center justify-center flex-col py-5"

                    onSubmit={(e) => {
                        e.preventDefault();
                        signIn("credentials", {
                            email,
                            password,
                            callbackUrl: "/",
                        });
                    }}
                >
                    <div className="px-2 w-full">
                        <input
                            type="text"
                            className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                            placeholder="E-mail ID"
                            onChange={({ target }) => {
                                setEmail(target.value);
                            }}
                        />
                    </div>
                    <div className="px-2 w-full">
                        <input
                            type="password"
                            className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                            placeholder="Password"
                            onChange={({ target }) => {
                                setPassword(target.value);
                            }}
                        />
                    </div>
                    <div className="px-2 w-full flex items-center justify-center w-full py-5">
                        <button className="bg-blue-500 hover:bg-blue-600 p-4 font-bold py-2 text-white rounded-md w-1/2 flex items-center justify-center">
                            <span>Login</span>
                            <span className="ml-2 text-xl text-white">
                                <IoLogIn />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 border my-0 m-auto"></div>
            <div className="w-1/2 my-0 m-auto py-2">
                <button
                    className="text-gray-600"
                    onClick={() => {
                        toggleSignup();
                    }}
                >
                    Create Account
                </button>
            </div>
        </div>
    );
}

class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        fname: "",
        lname: "",
        phone: "",
    };
    async createAccount() {
        const { email, password, fname, lname, phone } = this.state;
        if (
            email &&
            password &&
            fname &&
            lname &&
            phone &&
            password === this.state.confirmPassword
        ) {
            this.myFormRef.reset();
            const response = await fetch("/api/account/create-account", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    signUpUser: base64.encode(
                        JSON.stringify({ fname, lname, phone, email, password })
                    ),
                }),
            });
            const json = await response.json();
            if (json.success) {
                alert("Account created! Try to login!");
                this.props.toggleLogin();
            } else {
                alert("Account creation Error!");
            }
        } else {
            alert("Cannot send empty fields!");
        }
    }
    render() {
        const { email, password, confirmPassword, fname, lname, phone } =
            this.state;
        const disabledButton =
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            fname === "" ||
            lname === "" ||
            phone === "" ||
            confirmPassword !== password;
        return (
            <div className="flex align-center h-screen h-4/5 w-2/4 bg-white rounded-lg shadow-lg flex-col p-3">
                <div className="flex items-center justify-end">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded-full text-white flex items-center justify-center"
                        onClick={() => {
                            this.props.toggleSignup();
                        }}
                    >
                        <span>
                            <AiFillCloseCircle />
                        </span>{" "}
                        <span className="ml-2">Close</span>
                    </button>
                </div>
                <div className="w-full flex items-center justify-center flex-col">
                    <h1 className="text-3xl font-bold text-center py-5">Signup</h1>
                    <form
                        className="w-full flex items-center justify-center flex-col py-5"
                        ref={(el) => (this.myFormRef = el)}
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.createAccount();
                        }}
                    >
                        <div className="w-full flex items-center justify-center">
                            <div className="px-2 w-1/2">
                                <input
                                    type="text"
                                    className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                                    placeholder="First Name"
                                    onChange={({ target }) => {
                                        this.setState({ fname: target.value });
                                    }}
                                />
                            </div>
                            <div className="px-2 w-1/2">
                                <input
                                    type="text"
                                    className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                                    placeholder="Last Name"
                                    onChange={({ target }) => {
                                        this.setState({ lname: target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="px-2 w-1/2">
                                <input
                                    type="text"
                                    className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                                    placeholder="Phone Number"
                                    onChange={({ target }) => {
                                        this.setState({ phone: target.value });
                                    }}
                                />
                            </div>
                            <div className="px-2 w-1/2">
                                <input
                                    type="email"
                                    className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                                    placeholder="Email ID"
                                    onChange={({ target }) => {
                                        this.setState({ email: target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="px-2 w-1/2">
                                <input
                                    type="password"
                                    className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                                    placeholder="Password"
                                    onChange={({ target }) => {
                                        this.setState({ password: target.value });
                                    }}
                                />
                            </div>
                            <div className="px-2 w-1/2">
                                <input
                                    type="password"
                                    className="bg-gray-200 rounded-md px-2 py-2 my-2 w-full "
                                    placeholder="Confirm Password"
                                    onChange={({ target }) => {
                                        this.setState({ confirmPassword: target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="py-2">
                            {confirmPassword !== password && (
                                <p className="text-gray-600">
                                    Confirm password must be same as password
                                </p>
                            )}
                        </div>
                        <div className="px-2 w-full flex items-center justify-center w-full py-5">
                            <button
                                className={`bg-blue-500 hover:bg-blue-600 px-4 flex items-center justify-center font-bold py-2 text-white rounded-md w-1/2 ${disabledButton ? "opacity-50" : ""
                                    }`}
                                disabled={disabledButton}
                            >
                                Signup
                                <span className="ml-2 text-xl">
                                    <IoCreateOutline />
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 border my-0 m-auto"></div>
                <div className="w-1/2 my-0 m-auto py-2">
                    <button
                        className="text-gray-600"
                        onClick={() => {
                            this.props.toggleLogin();
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
}

export { Login, Signup };
