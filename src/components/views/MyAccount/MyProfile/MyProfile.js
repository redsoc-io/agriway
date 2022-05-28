import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoSave } from "react-icons/io5";
const base64 = require("base-64");

export default class Myprofile extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    phone: "",
    email: ""
  }
  async getProfile() {
    const response = await fetch("/api/account/get_account");
    const json = await response.json();
    this.setState({ first_name: json.fname, last_name: json.lname, email: json.email, phone: json.phone })
  }
  componentDidMount() {
    this.getProfile()
  }
  async editProfile() {
    const response = await fetch("/api/account/edit_account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        editUser: base64.encode(
          JSON.stringify({
            fname: this.state.first_name,
            lname: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone
          })
        ),
      }),
    })
    const json = await response.json()
    if (json.error) {
      alert("Error editing profile")
    }
    else {
      alert("Profile edited successfully")
    }
    this.getProfile()
  }
  render() {
    var image = ""
    try {
      image = this.props.session.session.user.image + "?s=300"
    } catch (e) { }
    const disabledButton = !(this.state.first_name && this.state.last_name && this.state.phone && this.state.email)
    return (
      <div className="w-full">
        <h1 className="flex items-center justify-center text-3xl py-5">
          My Profile
        </h1>

        <div className="flex items-center justify-center flex-col">
          <div className="h-56 w-56 bg-gray-400 rounded-full overflow-hidden relative">
            <img src={image} className="w-full h-full" />
            <div className="absolute opacity-0 hover:opacity-50 top-0 right-0 bottom-0 w-full h-full top-0 flex items-center justify-center bg-black text-white font-bold">
              <h1 className="text-xl text-center">Change on Gravatar</h1>
            </div>
          </div>
          <div className="flex py-2 text-3xl font-bold">
            <h1>{this.state.first_name ? `${this.state.first_name} ${this.state.last_name}` : `Name...`}</h1>
          </div>
          <form className="py-4 w-full flex items-center justify-center flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              this.editProfile()
            }}
          >
            <div className="flex py-3">
              <div className="px-2 ">
                <input
                  type="text"
                  className="border border-gray-800 rounded-md px-1 py-2"
                  placeholder="First Name"
                  defaultValue={this.state.first_name}
                  onChange={({ target }) => {
                    this.setState({ first_name: target.value })
                  }}
                />
              </div>
              <div className="px-2">
                <input
                  type="text"
                  className="border border-gray-800 rounded-md px-1 py-2"
                  placeholder="Last Name"
                  defaultValue={this.state.last_name}
                  onChange={({ target }) => {
                    this.setState({ last_name: target.value })
                  }}
                />
              </div>
            </div>
            <div className="flex py-3">
              <div className="px-2">
                <input
                  type="email"
                  className="border border-gray-800 rounded-md px-1 py-2"
                  placeholder="Email ID"
                  defaultValue={this.state.email}
                  onChange={({ target }) => {
                    this.setState({ email: target.value })
                  }}
                />
              </div>
              <div className="px-2">
                <input
                  type="text"
                  maxLength={11}
                  minLength={10}
                  className="border border-gray-800 rounded-md px-1 py-2"
                  placeholder="Phone number"
                  defaultValue={this.state.phone}
                  onChange={({ target }) => {
                    this.setState({ phone: target.value })
                  }}
                />
              </div>
            </div>

            <div className="pb-6">
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
          </form>
        </div>
      </div>
    )
  }
}