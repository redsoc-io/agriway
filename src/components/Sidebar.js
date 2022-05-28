import { GiHamburgerMenu, GiFarmer } from "react-icons/gi";
import { BiBox, BiTable } from "react-icons/bi";
import { CgHome, CgProfile } from "react-icons/cg";
import { FiPercent } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io"
import { FaLock } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Login, Signup } from "./Registration"
import { useRouter } from 'next/router'

import Link from "next/link"

import { getSession, signOut } from "next-auth/react"

function NavUnit({ item, collapsed }) {
  const router = useRouter();
  return (
    <li>
      <Link href={item.url}>
        <a className={`py-3 px-5 w-full text-center ${router.pathname === item.url ? "bg-gray-300" : "hover:bg-gray-200"} flex items-center justify-start`}>
          <span className={`mr-2 ${collapsed ? 'text-3xl mx-1' : ''}`}>{item.icon}</span>
          {!collapsed &&
            <span>{item.name}</span>
          }
        </a>
      </Link>
    </li>
  );
}

const userBar = [
  { icon: <CgHome />, name: "Home", url: "/" },
  { icon: <CgProfile />, name: "My Account", url: "/account" },
  { icon: <FiPercent />, name: "My Orders", url: "/orders" },
  { icon: <BiBox />, name: "My Cart", url: "/my-cart" },
]

const supBar = [
  { icon: <CgProfile />, name: "My Profile", url: "/sup-profile" },
  { icon: <GiFarmer />, name: "Manage Farmers", url: "/traders" },
  { icon: <BiTable />, name: "Inventory", url: "/inventory" }
]

const xBar = [
  { icon: <CgHome />, name: "Home", url: "/" },
  { icon: <BiBox />, name: "My Cart", url: "/my-cart" },
]

function getRole(session) {
  try {
    const sub = JSON.parse(session.token.sub);
    return sub.role;
  }
  catch (e) {

  }
  return 'u'
}

export default function Sidebar({ session, toggleCollapse, collapsed }) {
  var role = getRole(session);

  const router = useRouter();
  useEffect(() => {
    try {
      if (router.query.login === "") {
        toggleLogin()
      }
    }
    catch (e) { }
  }, [])
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  function toggleLogin() {
    setShowLogin(!showLogin);
    setShowSignup(false);
  }
  function toggleSignup() {
    setShowSignup(!showSignup);
    setShowLogin(false);
  }
  function closeAll() {
    setShowLogin(false);
    setShowSignup(false);
  }


  return (
    <>
      <aside className={`${collapsed ? 'lg:w-1/12 w-full' : 'lg:w-3/12 w-full'} h-full flex items-center flex-col justify-start py-3 bg-gray-100 fixed left-0 top-0 bottom-0`}>
        <div className="h-full mt-12 w-full">
          <div className="text-3xl px-4 lg:flex hidden items-center justify-center w-full font-bold relative mt-4">
            <div>
              <button
                className="cursor-pointer text-3xl left-4 top-4 absolute h-12 w-12 flex items-center justify-center rounded-full p-2 bg-gray-300"
                onClick={() => { toggleCollapse() }}
              >
                <GiHamburgerMenu />
              </button>
            </div>
          </div>
          <div className="w-full py-12 mt-10">
            <ul className="w-full cursor-pointer">
              {(session ? (role === 's') ? supBar : userBar : xBar).map((item, index) => {
                return <NavUnit key={index} item={item} collapsed={collapsed} />;
              })}

              {
                session ? <button
                  className="flex items-center justify-start bg-red-600 hover:bg-red-700 px-5 py-2 text-white font-bold w-full"
                  onClick={() => {
                    signOut()
                  }}
                >
                  <span>
                    <IoMdLogOut />
                  </span>
                  <span className="ml-2">Logout</span>
                </button> : <button
                  className="flex items-center justify-start bg-blue-600 hover:bg-blue-700 px-5 py-2 text-white font-bold w-full"
                  onClick={() => {
                    toggleLogin();
                  }}
                >
                  <span>
                    <FaLock />
                  </span>
                  <span className="ml-2">Login</span>
                </button>
              }
            </ul>
          </div>
        </div>
      </aside>
      {(showLogin || showSignup) && (
        <div className="fixed inset-0 z-50 top-0 right-0 bottom-0 left-0 bg-sky-500/20 flex items-center justify-center">
          {showLogin && (
            <Login
              toggleLogin={toggleLogin}
              toggleSignup={toggleSignup}
              closeAll={closeAll}
            />
          )}
          {showSignup && (
            <Signup
              toggleLogin={toggleLogin}
              toggleSignup={toggleSignup}
              closeAll={closeAll}
            />
          )}
        </div>
      )}
    </>
  );
}
